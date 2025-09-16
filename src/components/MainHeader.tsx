import  {Link} from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/hooks/useTranslation';
import logo from '../assets/logo.png';
const MainHeader = () => {
  const { openLoginModal, openSignUpModal } = useAuthStore();
  const { t } = useTranslation();
  return (
    <div className="bg-white  px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center space-x-4">
         
          <Link to="/" className="flex items-center justify-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src={logo}
              alt="Ministry Logo" 
              className="w-[70px] h-[100px]"
            />
            <div className="text-sm">
              <div className="font-bold text-blue-900">MINISTRY OF </div>
              <div className="font-bold text-blue-900">CORPORATE</div>
              <div className="font-bold text-blue-900">AFFAIRS</div>
              <div className="text-xs text-gray-600">GOVERNMENT OF INDIA</div>
            </div>
          </Link>

   
          <div className="flex items-center space-x-3 ml-8">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PMIS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-500">
                PM Internship
              </h1>
              <div className="text-xs text-gray-600">GOVERNMENT INITIATIVE</div>
            </div>
          </div>
        </div>

    
        <div className="flex items-center space-x-4">
       
          <button 
            onClick={openSignUpModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
          >
            <span>👤</span>
            {t('youthRegistration')}
          </button>
          <button 
            onClick={openLoginModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
          >
           
            {t('login')}
          </button>


          <div className="ml-4">
            <img 
              src={logo}
              alt="Digital India" 
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;