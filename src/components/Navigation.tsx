import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useAccessibilityStore } from '@/store/useAccessibilityStore';
import { useTranslation } from '@/hooks/useTranslation';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  const { openLoginModal, openSignUpModal, isAuthenticated } = useAuthStore();
  useAccessibilityStore();

  const navItems = [
    { name: t('home'), href: '/home' },
    { name: t('guidelines'), href: '/guidelines' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('eligibility'), href: '/eligibility' },
    { name: t('mobileApp'), href: '/mobile-app' },
    { name: t('support'), href: '/support' },
    { name: t('compendium'), href: '/compendium' }
  ];

  return (
    <section className="bg-black rounded-2xl mt-[5px] text-white sticky top-0 z-40 shadow-lg " >
      <div className="max-w-7xl  mx-auto px-9 sm:px-6 lg:px-8">
        <div className="flex max-w-7xl justify-center items-center h-12">
          <div className="flex  items-center justify-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name}>
                <Link
                  to={item.href}
                  className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-sm px-4 py-2 gov-focus"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary-foreground/20 mt-2 pt-4 pb-4"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-primary-foreground hover:text-accent transition-colors duration-200 font-medium gov-focus"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isAuthenticated && (
                <div className="space-y-2 pt-4 border-t border-primary-foreground/20">
                  <button
                    onClick={() => {
                      openLoginModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn-gov-outline"
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => {
                      openSignUpModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full btn-gov-secondary"
                  >
                    {t('signUp')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Navigation;
