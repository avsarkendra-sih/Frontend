import {  Accessibility } from 'lucide-react';
import { useAccessibilityStore } from '@/store/useAccessibilityStore';
import { useTranslation } from '@/hooks/useTranslation';
import india from '../assets/india.jpg'

const TopGovHeader = () => {
  const { t } = useTranslation();
  const { 
    language, 
    setLanguage, 
    toggleScreenReaderMode, 
    isScreenReaderMode,
    fontSize,
    setFontSize
  } = useAccessibilityStore();

  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'hi' as const, name: 'हिंदी' },
    { code: 'ml' as const, name: 'മലയാളം' }
  ];

  

  return (
    <div className="bg-white border-b border-gray-200 py-1 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-3">
          <img 
            src={india} 
            alt="Indian Flag" 
            className="w-6 h-4"
          />
          <span className="text-sm font-medium text-gray-700">भारत सरकार / {t('govBranding')} </span>
        </div>

        <div className="flex items-center space-x-4">
         
          <div className="relative">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

        
          <button
            onClick={toggleScreenReaderMode}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
              isScreenReaderMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Toggle Screen Reader"
          >
            <Accessibility className="w-3 h-3" />
            <span>{t('screenReader')}</span>
          </button>

          {/* Font Size Controls */}
          <div className="flex items-center space-x-1">
          
            <button
              onClick={() => setFontSize('normal')}
              className={`text-xs px-1 py-1 rounded ${
                fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`text-sm px-1 py-1 rounded ${
                fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('extra-large')}
            
              className={`text-base px-1 py-1 rounded ${
                fontSize === 'extra-large' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              A+
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopGovHeader;