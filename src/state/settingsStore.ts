import { create } from 'zustand';
import {
  createDefaultSettings,
  type AudioSettings,
  type DisplaySettings,
  type GameplaySettings,
  type Settings,
} from '@/storage/schema';
import { clamp } from '@/shared/utils/format';
import { initialSave } from './persistence';

interface SettingsState {
  settings: Settings;
  setAudio: (patch: Partial<AudioSettings>) => void;
  setDisplay: (patch: Partial<DisplaySettings>) => void;
  setGameplay: (patch: Partial<GameplaySettings>) => void;
  resetToDefaults: () => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  settings: initialSave.settings,
  setAudio: (patch) =>
    set((state) => {
      const audio = { ...state.settings.audio, ...patch };
      audio.master = clamp(audio.master, 0, 1);
      audio.sfx = clamp(audio.sfx, 0, 1);
      return { settings: { ...state.settings, audio } };
    }),
  setDisplay: (patch) =>
    set((state) => ({ settings: { ...state.settings, display: { ...state.settings.display, ...patch } } })),
  setGameplay: (patch) =>
    set((state) => ({ settings: { ...state.settings, gameplay: { ...state.settings.gameplay, ...patch } } })),
  resetToDefaults: () => set({ settings: createDefaultSettings() }),
}));
