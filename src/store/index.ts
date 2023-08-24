import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AppThemeType = 'dark' | 'light';
type ProgressBarType = HTMLElement;
type ChatUserInfoType = {
  name: string;
  role: 'member' | 'admin';
};

interface StoreType {
  appTheme: AppThemeType;
  setAppTheme: (appTheme: AppThemeType) => void;

  progressBar: ProgressBarType | null;
  setProgressBar: (progressBar: ProgressBarType) => void;

  chatUserInfo: ChatUserInfoType;
  setChatUserInfo: (chatUserInfo: ChatUserInfoType) => void;
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
          name: 'new_user',
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
