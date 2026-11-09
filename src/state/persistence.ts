import { create } from 'zustand';
import { DEFAULT_UNLOCKED_HEROES, HEROES } from '@/data/heroes';
import { PROFILE_RULES } from '@/data/rules/profile';
import { SafeStorage, resolveBrowserStorage, type StorageWriteError } from '@/storage/safeStorage';
import { SaveManager, type LoadResult, type LoadStatus } from '@/storage/SaveManager';
import { createDefaultSave, type SaveData } from '@/storage/schema';
import { createLogger } from '@/shared/utils/logger';
import { validatePlayerName } from './profileRules';

const log = createLogger('persistence');

const saveManager = new SaveManager(new SafeStorage(resolveBrowserStorage()), {
  defaults: createDefaultSave({
    playerName: PROFILE_RULES.defaultPlayerName,
    honorPoints: PROFILE_RULES.startingHonorPoints,
    unlockedHeroes: DEFAULT_UNLOCKED_HEROES,
    now: new Date().toISOString(),
  }),
  knownHeroIds: new Set(HEROES.map((hero) => hero.id)),
  isValidPlayerName: (name) => validatePlayerName(name).ok,
});

const initialLoad: LoadResult = saveManager.load();
if (initialLoad.issues.length > 0) {
  log.warn(`Dữ liệu lưu được khôi phục (${initialLoad.status})`, initialLoad.issues);
}

/** Dữ liệu đọc được khi khởi động – dùng làm giá trị đầu cho các store. */
export const initialSave: SaveData = initialLoad.data;

interface StorageStatusState {
  persistent: boolean;
  loadStatus: LoadStatus;
  lastSaveError: StorageWriteError | null;
}

/** Trạng thái lưu trữ để giao diện cảnh báo khi không lưu được (R12). */
export const useStorageStatus = create<StorageStatusState>()(() => ({
  persistent: initialLoad.persistent,
  loadStatus: initialLoad.status,
  lastSaveError: null,
}));

const SAVE_DEBOUNCE_MS = 400;
let pendingTimer: ReturnType<typeof setTimeout> | null = null;
let pendingCompose: (() => SaveData) | null = null;

function flush(): void {
  pendingTimer = null;
  const compose = pendingCompose;
  pendingCompose = null;
  if (!compose) return;
  const result = saveManager.save(compose());
  useStorageStatus.setState({ lastSaveError: result.ok ? null : result.reason });
  if (!result.ok) log.warn(`Không thể lưu dữ liệu: ${result.reason}`);
}

/** Lên lịch ghi dữ liệu (gộp nhiều thay đổi liên tiếp thành một lần ghi). */
export function scheduleSave(compose: () => SaveData): void {
  pendingCompose = compose;
  if (pendingTimer !== null) clearTimeout(pendingTimer);
  pendingTimer = setTimeout(flush, SAVE_DEBOUNCE_MS);
}

/** Ghi ngay lập tức các thay đổi đang chờ (gọi khi đóng trang). */
export function flushPendingSave(): void {
  if (pendingTimer !== null) clearTimeout(pendingTimer);
  flush();
}
