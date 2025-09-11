import { useStore } from "../store/useStore";


const languages = [
  { code: 'english', name: 'English', native: 'English' },
  { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
  { code: 'malayalam', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
  { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
  { code: 'marathi', name: 'Marathi', native: 'मराठी' },
  { code: 'punjabi', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'odia', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];

export default function GovernmentHeader() {
  const { 
    currentLanguage, 
    screenReaderMode, 
    setLanguage, 
    setScreenReaderMode 
  } = useStore();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="tricolor-flag w-8 h-6 rounded-sm"></div>
          <div className="flex items-center space-x-3">
            <img 
              src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
              alt="Government of India Emblem" 
              className="w-10 h-10"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">भारत सरकार / Government Of India</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select 
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white focus:ring-2 focus:ring-govt-orange focus:border-transparent"
              data-testid="language-selector"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => setScreenReaderMode(!screenReaderMode)}
            className={`text-sm px-3 py-1 rounded transition-colors ${
              screenReaderMode 
                ? 'bg-govt-orange text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            data-testid="screen-reader-toggle"
          >
            Screen Reader
          </button>
          
          <div className="flex items-center space-x-1 text-gray-600">
            <span className="text-xs">A</span>
            <span className="text-sm">A</span>
            <span className="text-base font-semibold">A+</span>
          </div>
        </div>
      </div>
    </header>
  );
}
