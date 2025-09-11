import { useEffect } from 'react';
import TopGovHeader from './TopGovHeader';
import MainHeader from './MainHeader';
import Navigation from './Navigation';
import AnnouncementBar from './AnnouncementBar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import EligibilitySection from './EligibilitySection';
import StepsSection from './StepsSection';
import Footer from './Footer';
import AuthModals from './AuthModals';
import { useAccessibilityStore } from '@/store/useAccessibilityStore';
import { useThemeStore } from '@/store/useThemeStore';

const Layout = () => {
  const { isHighContrast, fontSize } = useAccessibilityStore();
  const { theme } = useThemeStore();

  // Apply theme and accessibility settings on mount
  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Apply high contrast
    if (isHighContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
    
    // Apply font size
    document.body.classList.remove('normal', 'large-text', 'extra-large-text');
    if (fontSize === 'large') {
      document.body.classList.add('large-text');
    } else if (fontSize === 'extra-large') {
      document.body.classList.add('extra-large-text');
    }
  }, [theme, isHighContrast, fontSize]);

  return (
    <div className="min-h-screen p-[10px_20px]  bg-background">
      {/* Top Government Header */}
      <TopGovHeader />
      
      {/* Main Header */}
      <MainHeader />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Announcement Bar */}
      <AnnouncementBar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <EligibilitySection />
        <StepsSection />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Authentication Modals */}
      <AuthModals />
    </div>
  );
};

export default Layout;