import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  isVerified: boolean;
}

interface StoreState {

  user: User | null;
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
 
  currentLanguage: string;
  textSize: 'normal' | 'large' | 'xl';
  highContrast: boolean;
  screenReaderMode: boolean;
  
 
  setUser: (user: User | null) => void;
  setLoginModalOpen: (open: boolean) => void;
  setSignUpModalOpen: (open: boolean) => void;
  setLanguage: (language: string) => void;
  setTextSize: (size: 'normal' | 'large' | 'xl') => void;
  setHighContrast: (enabled: boolean) => void;
  setScreenReaderMode: (enabled: boolean) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isLoginModalOpen: false,
      isSignUpModalOpen: false,
      currentLanguage: 'english',
      textSize: 'normal',
      highContrast: false,
      screenReaderMode: false,
      
      // Actions
      setUser: (user) => set({ user }),
      setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
      setSignUpModalOpen: (open) => set({ isSignUpModalOpen: open }),
      setLanguage: (language) => set({ currentLanguage: language }),
      setTextSize: (size) => set({ textSize: size }),
      setHighContrast: (enabled) => set({ highContrast: enabled }),
      setScreenReaderMode: (enabled) => set({ screenReaderMode: enabled }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'pm-internship-store',
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
        textSize: state.textSize,
        highContrast: state.highContrast,
        screenReaderMode: state.screenReaderMode,
      }),
    }
  )
);
