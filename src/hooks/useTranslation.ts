import { useAccessibilityStore } from '@/store/useAccessibilityStore';
import { translations } from '@/translations';

export const useTranslation = () => {
  const { language } = useAccessibilityStore();

  type Language = keyof typeof translations;

  const t = (key: keyof typeof translations.en): string => {
    const lang = language as Language;
    return translations[lang][key] || translations.en[key] || key;
  };
  
  return { t, language };
};