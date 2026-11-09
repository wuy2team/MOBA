import { CURRENT_SAVE_VERSION, type SaveData } from '@/storage/schema';
import { flushPendingSave, scheduleSave } from './persistence';
import { useProfileStore } from './profileStore';
import { useSettingsStore } from './settingsStore';

/** Gộp trạng thái các store thành một bản ghi lưu. */
export function composeSaveData(): SaveData {
  const profile = useProfileStore.getState();
  const { settings } = useSettingsStore.getState();
  return {
    version: CURRENT_SAVE_VERSION,
    profile: { playerName: profile.playerName, createdAt: profile.createdAt, honorPoints: profile.honorPoints },
    unlockedHeroes: [...profile.unlockedHeroes],
    settings,
    stats: profile.stats,
  };
}

/**
 * Bật lưu tự động: mỗi thay đổi hồ sơ/cài đặt được ghi (có debounce),
 * và ghi ngay khi người dùng đóng hoặc ẩn trang. Trả về hàm tắt.
 */
export function startAutoSave(): () => void {
  const unsubscribeProfile = useProfileStore.subscribe(() => scheduleSave(composeSaveData));
  const unsubscribeSettings = useSettingsStore.subscribe(() => scheduleSave(composeSaveData));
  const onHide = () => {
    if (document.visibilityState === 'hidden') flushPendingSave();
  };
  window.addEventListener('pagehide', flushPendingSave);
  document.addEventListener('visibilitychange', onHide);
  return () => {
    unsubscribeProfile();
    unsubscribeSettings();
    window.removeEventListener('pagehide', flushPendingSave);
    document.removeEventListener('visibilitychange', onHide);
  };
}
