import React, { useState, useEffect } from 'react';
import {
  fetchNews,
  fetchShopItems,
  fetchVideos,
  fetchGallery,
  fetchMatches,
} from './services/api';
import { NewsItem, ShopItem, VideoItem, GalleryItem, MatchItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeJerseyShowcase } from './components/HomeJerseyShowcase';
import { NewsSection } from './components/NewsSection';
import { AllNewsPage } from './components/AllNewsPage';
import { VideosSection } from './components/VideosSection';
import { YellowHeartSection } from './components/YellowHeartSection';
import { YoungBlastersSection } from './components/YoungBlastersSection';
import { GallerySection } from './components/GallerySection';
import { CinematicVideoSection } from './components/CinematicVideoSection';
import { BannerAndFooter } from './components/BannerAndFooter';

// Modals
import { TicketModal } from './components/modals/TicketModal';
import { ClubModal } from './components/modals/ClubModal';
import { NewsModal } from './components/modals/NewsModal';
import { VideoModal } from './components/modals/VideoModal';
import { YellowHeartModal } from './components/modals/YellowHeartModal';
import { AcademyModal } from './components/modals/AcademyModal';
import { HouseOfKbfcModal } from './components/modals/HouseOfKbfcModal';
import { FanAdvisoryModal } from './components/modals/FanAdvisoryModal';
import { KidsClubModal } from './components/modals/KidsClubModal';
import { CartDrawer } from './components/modals/CartDrawer';

export const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Modals state
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isYellowHeartModalOpen, setIsYellowHeartModalOpen] = useState(false);
  const [isAcademyModalOpen, setIsAcademyModalOpen] = useState(false);
  const [isHouseOfKbfcModalOpen, setIsHouseOfKbfcModalOpen] = useState(false);
  const [isFanAdvisoryModalOpen, setIsFanAdvisoryModalOpen] = useState(false);
  const [isKidsClubModalOpen, setIsKidsClubModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'all-news'>('home');

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [newsRes, shopRes, videosRes, galleryRes, matchesRes] = await Promise.all([
          fetchNews(),
          fetchShopItems(),
          fetchVideos(),
          fetchGallery(),
          fetchMatches(),
        ]);
        setNews(newsRes);
        setShopItems(shopRes);
        setVideos(videosRes);
        setGallery(galleryRes);
        setMatches(matchesRes);
      } catch (err) {
        console.error('Failed to load initial club data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const featuredArticle = news.find((n) => n.featured) || news[0];
  const nextMatch = matches.find((m) => m.status === 'UPCOMING') || matches[0];

  const handleReadNowHero = () => {
    if (featuredArticle) {
      setSelectedArticle(featuredArticle);
    } else {
      document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {currentView === 'all-news' ? (
        <AllNewsPage
          news={news}
          onSelectArticle={(article) => setSelectedArticle(article)}
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenTickets={() => setIsTicketModalOpen(true)}
        />
      ) : (
        <div className="relative min-h-screen bg-kbfc-dark text-slate-100 flex flex-col selection:bg-kbfc-yellow selection:text-kbfc-dark">
          {/* 1. Top Landing Navigation Bar (Only on landing hero, scrolls away with page) */}
          <Navbar
            onOpenTickets={() => setIsTicketModalOpen(true)}
            onOpenClub={() => setIsClubModalOpen(true)}
            onOpenHouseOfKbfc={() => setIsHouseOfKbfcModalOpen(true)}
            onOpenFanAdvisory={() => setIsFanAdvisoryModalOpen(true)}
            onOpenKidsClub={() => setIsKidsClubModalOpen(true)}
            onOpenAllNews={() => {
              setCurrentView('all-news');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <main className="flex-1">
            {/* Section 1: Full-Width Hero Section */}
            <HeroSection
              onReadNow={handleReadNowHero}
              onBookTickets={() => setIsTicketModalOpen(true)}
              featuredNews={featuredArticle}
              nextMatch={nextMatch}
            />

             {/* Section 3: Latest News Section (Modular Bento Grid Design) */}
            <NewsSection
              news={news}
              onSelectArticle={(article) => setSelectedArticle(article)}
              onOpenAllNews={() => {
                setCurrentView('all-news');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPlayVideo={() => {
                if (videos[0]) setSelectedVideo(videos[0]);
              }}
            />


            {/* Section 2B: Dedicated Home Jersey Sale & 3D Interactive Flip Showcase */}
            <HomeJerseyShowcase />


            {/* Section 4: Featured Videos & Match Center */}
            <VideosSection
              videos={videos}
              onPlayVideo={(video) => setSelectedVideo(video)}
            />

            {/* Section 5: The Yellow Heart Initiative (CSR & Community) */}
            <YellowHeartSection
              onReadMore={() => setIsYellowHeartModalOpen(true)}
            />

            {/* Section 6: Young Blasters (Sport Hood Academy) */}
            <YoungBlastersSection
              onLearnMore={() => setIsAcademyModalOpen(true)}
            />

            {/* Section 7: Matchday & Fan Gallery */}
            <GallerySection gallery={gallery} />

            {/* Section 7B: Full-Screen Cinematic Video Experience (GIF Model) */}
            <CinematicVideoSection />

            {/* Section 8: Full-Height Banner & Footer */}
            <BannerAndFooter
              onOpenTickets={() => setIsTicketModalOpen(true)}
              onOpenClub={() => setIsClubModalOpen(true)}
              onOpenHouseOfKbfc={() => setIsHouseOfKbfcModalOpen(true)}
              onOpenFanAdvisory={() => setIsFanAdvisoryModalOpen(true)}
              onOpenKidsClub={() => setIsKidsClubModalOpen(true)}
            />
          </main>
        </div>
      )}

      {/* Cart Flyout Drawer */}
      <CartDrawer />

      {/* Interactive Overlays & Modals */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        selectedMatch={nextMatch}
      />

      <ClubModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
      />

      <NewsModal
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />

      <VideoModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />

      <YellowHeartModal
        isOpen={isYellowHeartModalOpen}
        onClose={() => setIsYellowHeartModalOpen(false)}
      />

      <AcademyModal
        isOpen={isAcademyModalOpen}
        onClose={() => setIsAcademyModalOpen(false)}
      />

      <HouseOfKbfcModal
        isOpen={isHouseOfKbfcModalOpen}
        onClose={() => setIsHouseOfKbfcModalOpen(false)}
      />

      <FanAdvisoryModal
        isOpen={isFanAdvisoryModalOpen}
        onClose={() => setIsFanAdvisoryModalOpen(false)}
      />

      <KidsClubModal
        isOpen={isKidsClubModalOpen}
        onClose={() => setIsKidsClubModalOpen(false)}
      />
    </>
  );
};
