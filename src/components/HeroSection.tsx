import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import pm from '../assets/pm.png'

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full mx-auto relative p-[10px_100px] flex flex-col mt-[10px] min-h-[500px] bg-gradient-to-r from-orange-500 to-orange-300 px-9 overflow-hidden">
     
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <div className="space-y-2">
              <p className="text-lg font-medium">{t('checkYour')}</p>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {t('ticketStatus')}
              </h1>
              <div className="bg-blue-600 text-white px-6 py-3 rounded-lg inline-block text-lg font-semibold">
                {t('withAadhaar')}
              </div>
            </div>
            
            <p className="text-lg leading-relaxed max-w-xl">
              {t('heroDescription')}
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2">
              <span className="text-xl">👤</span>
              {t('checkStatus')}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={pm}
                alt="Prime Minister"
                className="w-full h-auto max-w-md ml-auto rounded-lg"
              />
              
              {/* Aadhaar card mockup */}
              <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🏛️</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">भारत सरकार</div>
                    <div className="text-xs text-gray-600">GOVERNMENT OF INDIA</div>
                    <div className="text-xs text-blue-600 mt-1">NAME: XXXX</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;