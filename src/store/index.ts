import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreType {
  appTheme: 'dark' | 'light';
  setAppTheme: (appTheme: 'dark' | 'light') => void;

  progressBar: HTMLElement | null;
  setProgressBar: (progressBar: HTMLElement) => void;

  chatUserInfo: {
    name: string;
    role: 'member' | 'admin';
  };
  setChatUserInfo: (chatUserInfo: { name: string; role: 'member' | 'admin' }) => void;
}

const GENERAL_STORE_NAME = 'General Store';
const GENERAL_STORE_VERSION = 0.01;

export const useStore = create<StoreType>()(
  devtools(
    persist(
      (set, get) => ({
        appTheme: 'dark',
        setAppTheme: (appTheme) => set({ appTheme }),

        progressBar: null,
        setProgressBar: (progressBar) => set({ progressBar }),

        chatUserInfo: {
          name: '',
          role: 'member',
        },
        setChatUserInfo: (chatUserInfo) => set({ chatUserInfo }),
      }),
      {
        name: GENERAL_STORE_NAME,
        version: GENERAL_STORE_VERSION,
      },
    ),
  ),
);
