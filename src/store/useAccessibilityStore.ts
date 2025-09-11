import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
  language: 'en' | 'hi' | 'ml';
  isScreenReaderMode: boolean;
  isHighContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  
  setLanguage: (language: 'en' | 'hi' | 'ml') => void;
  toggleScreenReaderMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      language: 'en',
      isScreenReaderMode: false,
      isHighContrast: false,
      fontSize: 'normal',
      
      setLanguage: (language) => set({ language }),
      toggleScreenReaderMode: () => set({ isScreenReaderMode: !get().isScreenReaderMode }),
      toggleHighContrast: () => {
        const newValue = !get().isHighContrast;
        set({ isHighContrast: newValue });
        // Apply high contrast class to body
        
        if (newValue) {
          document.body.classList.add('high-contrast-mode');
        } else {
          document.body.classList.remove('high-contrast-mode');
        }
      },
      setFontSize: (fontSize) => {
        set({ fontSize });
        // Apply font size class to body
        document.body.classList.remove('normal', 'large-text', 'extra-large-text');
        if (fontSize === 'large') {
          document.body.classList.add('large-text');
        } else if (fontSize === 'extra-large') {
          document.body.classList.add('extra-large-text');
        }
      },
    }),
    {
      name: 'accessibility-settings',
    }
  )
);