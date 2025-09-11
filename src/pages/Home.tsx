import { useTranslation } from '@/hooks/useTranslation';
import TopGovHeader from '@/components/TopGovHeader';
import MainHeader from '@/components/MainHeader';
import Navigation from '@/components/Navigation';
import AnnouncementBar from '@/components/AnnouncementBar';

import EligibilitySection from '@/components/EligibilitySection';

import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <TopGovHeader />
      <MainHeader />
      <Navigation />
      <AnnouncementBar />
      <EligibilitySection />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-foreground">
          {t('homePage')}
        </h1>
        <p className="text-center text-muted-foreground mt-4">
          Welcome to the Home page of PM Internship Portal
        </p>
      </main>
      
      <Footer />
      <AuthModals />
    </div>
  );
};

export default Home;