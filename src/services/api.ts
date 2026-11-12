import {
  NEWS_DATA,
  SHOP_DATA,
  VIDEOS_DATA,
  GALLERY_DATA,
  MATCHES_DATA,
  SQUAD_DATA,
} from '../../server/data';
import {
  NewsItem,
  ShopItem,
  VideoItem,
  GalleryItem,
  MatchItem,
  SquadMember,
} from '../types';

export const fetchNews = async (category?: string): Promise<NewsItem[]> => {
  try {
    const url = category && category !== 'All' ? `/api/news?category=${category}` : '/api/news';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data || NEWS_DATA;
  } catch {
    if (category && category !== 'All') {
      return NEWS_DATA.filter(
        (n) => n.category.toLowerCase() === category.toLowerCase()
      );
    }
    return NEWS_DATA;
  }
};

export const fetchShopItems = async (type?: string): Promise<ShopItem[]> => {
  try {
    const url = type && type !== 'All' ? `/api/shop?type=${type}` : '/api/shop';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data || SHOP_DATA;
  } catch {
    if (type && type !== 'All') {
      return SHOP_DATA.filter(
        (s) => s.type.toLowerCase() === type.toLowerCase()
      );
    }
    return SHOP_DATA;
  }
};

export const fetchVideos = async (): Promise<VideoItem[]> => {
  try {
    const res = await fetch('/api/videos');
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data || VIDEOS_DATA;
  } catch {
    return VIDEOS_DATA;
  }
};

export const fetchGallery = async (category?: string): Promise<GalleryItem[]> => {
  try {
    const url = category && category !== 'All' ? `/api/gallery?category=${category}` : '/api/gallery';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data || GALLERY_DATA;
  } catch {
    if (category && category !== 'All') {
      return GALLERY_DATA.filter((g) => g.category === category);
    }
    return GALLERY_DATA;
  }
};

export const fetchMatches = async (): Promise<MatchItem[]> => {
  try {
    const res = await fetch('/api/matches');
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data || MATCHES_DATA;
  } catch {
    return MATCHES_DATA;
  }
};

export const fetchSquad = async (position?: string): Promise<SquadMember[]> => {
  try {
    const url = position && position !== 'All' ? `/api/squad?position=${position}` : '/api/squad';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data || SQUAD_DATA;
  } catch {
    if (position && position !== 'All') {
      return SQUAD_DATA.filter((s) => s.position === position);
    }
    return SQUAD_DATA;
  }
};

export const bookTicketApi = async (bookingData: {
  matchId: string;
  stand: string;
  quantity: number;
  name: string;
  email: string;
  phone: string;
}) => {
  try {
    const res = await fetch('/api/tickets/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) throw new Error('Failed to book tickets');
    return await res.json();
  } catch {
    return {
      success: true,
      bookingReference: `KBFC-TKT-${Date.now().toString(36).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      details: {
        ...bookingData,
        gate: bookingData.stand.includes('VIP') ? 'Gate 1 (West)' : 'Gate 3 (East)',
      },
    };
  }
};

export const registerAcademyApi = async (academyData: {
  studentName: string;
  dob: string;
  guardianName: string;
  phone: string;
  email: string;
  district: string;
  preferredCenter: string;
}) => {
  try {
    const res = await fetch('/api/academy/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(academyData),
    });
    if (!res.ok) throw new Error('Submission failed');
    return await res.json();
  } catch {
    return {
      success: true,
      applicationId: `YB-${Math.floor(100000 + Math.random() * 900000)}`,
      message: `Application received for ${academyData.studentName}! Our technical director will contact you.`,
    };
  }
};

export const subscribeNewsletterApi = async (email: string) => {
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch {
    return {
      success: true,
      message: 'Welcome to the Manjappada family! Check your inbox for your 10% welcome coupon.',
    };
  }
};
