import { useTranslation } from '@/hooks/useTranslation';
import TopGovHeader from '@/components/TopGovHeader';
import MainHeader from '@/components/MainHeader';
import Navigation from '@/components/Navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';

const Gallery = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background">
      <TopGovHeader />
      <MainHeader />
      <Navigation />
      <AnnouncementBar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-foreground">
          {t('galleryPage')}
        </h1>
        <p className="text-center text-muted-foreground mt-4">
          Explore our gallery of internship experiences and success stories
        </p>
      </main>
      
      <Footer />
      <AuthModals />
    </div>
  );
};

export default Gallery;