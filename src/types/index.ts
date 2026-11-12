export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: 'First Team' | 'Academy' | 'Transfer' | 'Match Report' | 'Community' | 'Club';
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  featured?: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'Home' | 'Away' | 'Third' | 'Merch';
  edition: string;
  price: number;
  originalPrice?: number;
  sizes: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  features: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  youtubeId: string;
  thumbnail: string;
  views: string;
  date: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Matchday' | 'Manjappada' | 'Training' | 'Celebration';
  stadium: string;
  fixture: string;
  date: string;
  image: string;
  photographer: string;
}

export interface MatchItem {
  id: string;
  opponent: string;
  opponentShort: string;
  opponentLogo: string;
  homeOrAway: 'HOME' | 'AWAY';
  kbfcScore?: number;
  opponentScore?: number;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  date: string;
  time: string;
  venue: string;
  competition: string;
  matchday: number;
  ticketsAvailable: boolean;
}

export interface SquadMember {
  id: string;
  name: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  nationality: string;
  flag: string;
  appearances: number;
  goals: number;
  assists: number;
  image: string;
  isCaptain?: boolean;
}

export interface CartItem {
  item: ShopItem;
  selectedSize: string;
  quantity: number;
}
