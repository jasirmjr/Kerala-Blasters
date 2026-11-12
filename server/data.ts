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

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'news-client-1',
    slug: 'rising-the-ranks-arsh-anwer-shaikh-ebindas-yesudasan',
    title: 'Rising the Ranks: The Story of Arsh Anwer Shaikh and Ebindas Yesudasan',
    category: 'First Team',
    date: 'November 4, 2026',
    readTime: '4 min read',
    excerpt: 'From grassroots academy pitches to the Indian Super League first team, the remarkable journey of Kerala Blasters homegrown talents Arsh and Ebindas.',
    content: `Kerala Blasters FC has always believed in nurturing homegrown potential. The meteoric rise of goalkeeper Arsh Anwer Shaikh and dynamic winger Ebindas Yesudasan embodies the core philosophy of our academy ecosystem.
    
Both players have progressed through rigorous pre-season conditioning, earning starting berths and inspiring the next generation of football aspirers across Kerala. Speaking on their breakthrough, Head Coach remarked on their relentless work ethic and mental fortitude in high-pressure matchday environments.`,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    author: 'KBFC Media Team',
    featured: true,
  },
  {
    id: 'news-client-2',
    slug: 'match-report-cfc-vs-kbfc',
    title: 'Match Report: CFC vs KBFC',
    category: 'Match Report',
    date: 'October 31, 2026',
    readTime: '3 min read',
    excerpt: 'An intense southern rivalry clash in Chennai ends with Kerala Blasters securing crucial points following a resilient second-half defensive display.',
    content: `Kerala Blasters demonstrated exceptional defensive organisation and tactical discipline away from home against Chennaiyin FC. A solitary strike in the first half combined with clinical interventions from the backline sealed vital away points for the yellow brigade.`,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    author: 'Matchday Desk',
  },
  {
    id: 'news-client-3',
    slug: 'ashley-speaks-northeast-united-fc-v-kerala-blasters-fc',
    title: 'Ashley Speaks: NorthEast United FC v Kerala Blasters FC',
    category: 'Club',
    date: 'October 19, 2026',
    readTime: '3 min read',
    excerpt: 'Head Coach Ashley addresses the press ahead of the crucial encounter in Guwahati, discussing tactical rotations and squad fitness.',
    content: `In his pre-match press conference, Head Coach Ashley outlined the team's tactical preparations ahead of facing NorthEast United. He stressed the importance of clinical transitions and praised the squad's response in high-intensity training sessions throughout the week.`,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    author: 'Press Office',
  },
  {
    id: 'news-client-4',
    slug: 'match-preview-kerala-blasters-fc-vs-mumbai-city-fc',
    title: 'Match Preview: Kerala Blasters FC vs Mumbai City FC',
    category: 'First Team',
    date: 'October 24, 2026',
    readTime: '5 min read',
    excerpt: 'The Blasters gear up to host Mumbai City FC under the floodlights at the Kaloor fortress with 40,000 Yellow Army supporters behind them.',
    content: `All eyes turn to Jawaharlal Nehru Stadium in Kochi as Kerala Blasters prepare for a blockbuster clash against Mumbai City FC. With captain Adrián Luna orchestrating midfield rhythms and a fully fit attacking line, anticipation is at fever pitch across the state.`,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    author: 'Tactical Preview Desk',
  },
  {
    id: 'news-client-5',
    slug: 'match-report-kbfc-vs-mcfc',
    title: 'Match Report: KBFC vs MCFC',
    category: 'Match Report',
    date: 'October 25, 2026',
    readTime: '4 min read',
    excerpt: 'A pulsating encounter in Kochi sees the Yellow Army fight till the final whistle in front of a packed stadium atmosphere.',
    content: `An unforgettable footballing night in Kochi where Kerala Blasters went toe-to-toe with Mumbai City FC. Stoppage-time drama, thunderous decibels from the Manjappada stands, and heroic goalkeeping marked another epic Indian Super League duel.`,
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
    author: 'Match Report Desk',
  },
  {
    id: 'news-client-6',
    slug: 'match-report-neufc-vs-kbfc',
    title: 'Match Report: NEUFC vs KBFC',
    category: 'Match Report',
    date: 'October 18, 2026',
    readTime: '3 min read',
    excerpt: 'Blasters show grit on the road in Guwahati, battling through challenging conditions to earn a commendable matchday result.',
    content: `The Blasters exhibited tremendous spirit in Guwahati, managing game tempo and creating high-quality scoring opportunities in an enthralling encounter against NorthEast United FC.`,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80',
    author: 'Matchday Desk',
  },
  {
    id: 'news-client-7',
    slug: 'young-blasters-grassroots-u17-national-title',
    title: 'Young Blasters U-17 Lift National Youth Cup in Thrilling Final',
    category: 'Academy',
    date: 'October 14, 2026',
    readTime: '4 min read',
    excerpt: 'The Sport Hood Academy graduates showcase elite technical discipline to claim national silverware in Goa.',
    content: `A triumphant day for Kerala football as the Young Blasters U-17 squad were crowned champions of the All-India Youth Cup in Goa. Coached by the academy technical staff, the team recorded a clean sheet throughout the knockout stages.`,
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
    author: 'Academy Desk',
  },
  {
    id: 'news-client-8',
    slug: 'yellow-heart-community-drive-kerala',
    title: 'Yellow Heart Initiative Launches Statewide Grassroots Turf Project',
    category: 'Community',
    date: 'October 10, 2026',
    readTime: '3 min read',
    excerpt: 'Partnering with Manjappada volunteers, KBFC mobilizes youth sports infrastructure across Kerala districts.',
    content: `The Yellow Heart Initiative announced the inauguration of 5 new community mini-football turfs built using recycled materials, providing free coaching to underprivileged children across Kerala.`,
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=1200&q=80',
    author: 'Community Desk',
  },
];

export const SHOP_DATA: ShopItem[] = [
  {
    id: 'shop-home-25',
    name: 'KBFC Home Jersey Fan Edition 2026-27',
    type: 'Home',
    edition: 'Official Fan Edition',
    price: 999,
    originalPrice: 1999,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: '/assets/kbfc-home-jersey.png',
    rating: 4.9,
    reviewsCount: 384,
    badge: 'Official Kit',
    description: 'Inspired by Kerala’s coastal heritage of coir craftsmanship. Coir rope-inspired stripes bring a distinctive local identity to the classic yellow design with navy collar and cuffs.',
    features: ['100% Recycled Poly-Mesh', 'Heat-transferred 3D Club Crest', 'Anti-odor ventilation zones', 'Official Six5Six product'],
  },
  {
    id: 'shop-away-25',
    name: 'KBFC Away Jersey Fan Edition 2026-27',
    type: 'Away',
    edition: 'Official Fan Edition',
    price: 999,
    originalPrice: 1999,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    image: '/assets/kbfc-away-jersey.png',
    rating: 4.8,
    reviewsCount: 219,
    badge: 'Popular',
    description: 'Draws inspiration from Edavappathi, Kerala’s southwest monsoon, featuring a flowing rain-droplet pattern in layered shades of grey with sky blue and navy accents.',
    features: ['Athletic streamlined cut', 'Ventilated micro-perforated back', 'Ombré collar and cuffs', 'Official Six5Six product'],
  },
];

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'The Yellow Wave Podcast E02 | Ft Adrian Luna | Kerala Blasters',
    category: 'The Yellow Wave',
    duration: '24:43',
    youtubeId: 'pcZdz_H7C7c',
    thumbnail: 'https://img.youtube.com/vi/pcZdz_H7C7c/maxresdefault.jpg',
    views: '120K views',
    date: 'Official Podcast',
    description: 'Episode 2 of The Yellow Wave Podcast featuring team captain and midfielder Adrián Luna.',
  },
  {
    id: 'vid-2',
    title: 'The Yellow Wave | S02 EP02 | Ft. Ivan Vukomanović | Kerala Blasters FC',
    category: 'Club Exclusive',
    duration: '28:15',
    youtubeId: 'br3IpPiEEt0',
    thumbnail: 'https://img.youtube.com/vi/br3IpPiEEt0/maxresdefault.jpg',
    views: '185K views',
    date: 'Official Interview',
    description: 'Special sit-down episode with former head coach Ivan Vukomanović discussing his tactical philosophy and love for Kerala.',
  },
  {
    id: 'vid-3',
    title: 'The Yellow Wave Podcast E01 | Ft Noah Sadaoui | Kerala Blasters',
    category: 'The Yellow Wave',
    duration: '26:10',
    youtubeId: 'HcCnuIqIkBo',
    thumbnail: 'https://img.youtube.com/vi/HcCnuIqIkBo/maxresdefault.jpg',
    views: '240K views',
    date: 'Official Podcast',
    description: 'Episode 1 of The Yellow Wave Podcast featuring Moroccan winger Noah Sadaoui on his football journey and passion for Kerala.',
  },
  {
    id: 'vid-4',
    title: 'MANJAPPADA CHANTS | 40,000 Voices Singing "Yennum Yellow" in Unison',
    category: 'Fan Culture',
    duration: '04:18',
    youtubeId: '3JZ_D3ELwOQ',
    thumbnail: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80',
    views: '1.2M views',
    date: '3 weeks ago',
    description: 'Feel the spine-tingling acoustic atmosphere of Kaloor stadium under floodlights when the Yellow Army roars.',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Unstoppable Sea of Yellow',
    category: 'Manjappada',
    stadium: 'Jawaharlal Nehru Stadium, Kochi',
    fixture: 'KBFC vs Mohun Bagan SG',
    date: 'Matchday 18',
    image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Sujith Kumar / Manjappada lens',
  },
  {
    id: 'gal-2',
    title: 'Goal Limbo in the 90th Minute',
    category: 'Celebration',
    stadium: 'Kaloor Fortress, Kochi',
    fixture: 'KBFC vs Bengaluru FC',
    date: 'Matchday 16',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Arjun Das',
  },
  {
    id: 'gal-3',
    title: 'Captain’s Vision Under Floodlights',
    category: 'Matchday',
    stadium: 'JLN Stadium, Kochi',
    fixture: 'KBFC vs Mumbai City FC',
    date: 'Matchday 14',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80',
    photographer: 'KBFC Media Lens',
  },
  {
    id: 'gal-4',
    title: 'Intense Tactical Drills at Sunset',
    category: 'Training',
    stadium: 'Panampilly Nagar Training Ground',
    fixture: 'Pre-Derby Camp',
    date: 'Training Camp',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Midhun Joy',
  },
  {
    id: 'gal-5',
    title: 'The Tifo That Stunned the Nation',
    category: 'Manjappada',
    stadium: 'East Stand, Kaloor',
    fixture: 'Southern Derby',
    date: 'Matchday 12',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Manjappada Official',
  },
  {
    id: 'gal-6',
    title: 'Next Gen: Young Blasters in Action',
    category: 'Training',
    stadium: 'Sport Hood Elite Academy Centre',
    fixture: 'Academy Invitational',
    date: 'Grassroots Series',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Kiran Mohan',
  },
  {
    id: 'gal-7',
    title: 'Flairs and Fireworks Light Up Kochi Night',
    category: 'Celebration',
    stadium: 'Stadium Outer Promenade',
    fixture: 'Victory Parade',
    date: 'Post Derby',
    image: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Rahul Pillai',
  },
  {
    id: 'gal-8',
    title: 'Tunnel Vision: Stepping onto the Turf',
    category: 'Matchday',
    stadium: 'Kaloor Players Tunnel',
    fixture: 'ISL Matchday 20',
    date: 'Matchday 20',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    photographer: 'KBFC Creative Studio',
  },
];

export const MATCHES_DATA: MatchItem[] = [
  {
    id: 'match-next',
    opponent: 'Bengaluru FC',
    opponentShort: 'BFC',
    opponentLogo: '🦁',
    homeOrAway: 'HOME',
    status: 'UPCOMING',
    date: '2026-11-15T19:30:00+05:30',
    time: '7:30 PM IST',
    venue: 'Jawaharlal Nehru Stadium, Kaloor, Kochi',
    competition: 'Indian Super League 2025/26',
    matchday: 21,
    ticketsAvailable: true,
  },
  {
    id: 'match-prev',
    opponent: 'Mohun Bagan Super Giant',
    opponentShort: 'MBSG',
    opponentLogo: '⛵',
    homeOrAway: 'HOME',
    kbfcScore: 3,
    opponentScore: 1,
    status: 'COMPLETED',
    date: '2026-11-01T19:30:00+05:30',
    time: '7:30 PM IST',
    venue: 'JLN Stadium, Kochi',
    competition: 'Indian Super League 2025/26',
    matchday: 20,
    ticketsAvailable: false,
  },
  {
    id: 'match-future-1',
    opponent: 'Mumbai City FC',
    opponentShort: 'MCFC',
    opponentLogo: '⚓',
    homeOrAway: 'AWAY',
    status: 'UPCOMING',
    date: '2026-11-22T19:30:00+05:30',
    time: '7:30 PM IST',
    venue: 'Mumbai Football Arena, Andheri',
    competition: 'Indian Super League 2025/26',
    matchday: 22,
    ticketsAvailable: true,
  },
  {
    id: 'match-future-2',
    opponent: 'East Bengal FC',
    opponentShort: 'EBFC',
    opponentLogo: '🔥',
    homeOrAway: 'HOME',
    status: 'UPCOMING',
    date: '2026-11-29T19:30:00+05:30',
    time: '7:30 PM IST',
    venue: 'JLN Stadium, Kaloor, Kochi',
    competition: 'Indian Super League 2025/26',
    matchday: 23,
    ticketsAvailable: true,
  },
];

export const SQUAD_DATA: SquadMember[] = [
  {
    id: 'sq-1',
    name: 'Adrián Luna',
    number: 10,
    position: 'Midfielder',
    nationality: 'Uruguay',
    flag: '🇺🇾',
    appearances: 64,
    goals: 18,
    assists: 22,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80',
    isCaptain: true,
  },
  {
    id: 'sq-2',
    name: 'Noah Sadaoui',
    number: 7,
    position: 'Forward',
    nationality: 'Morocco',
    flag: '🇲🇦',
    appearances: 22,
    goals: 9,
    assists: 8,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sq-3',
    name: 'Kwame Peprah',
    number: 14,
    position: 'Forward',
    nationality: 'Ghana',
    flag: '🇬🇭',
    appearances: 26,
    goals: 11,
    assists: 4,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sq-4',
    name: 'Vibin Mohanan',
    number: 8,
    position: 'Midfielder',
    nationality: 'India',
    flag: '🇮🇳',
    appearances: 34,
    goals: 4,
    assists: 7,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sq-5',
    name: 'Rahul K.P.',
    number: 17,
    position: 'Forward',
    nationality: 'India',
    flag: '🇮🇳',
    appearances: 72,
    goals: 14,
    assists: 9,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sq-6',
    name: 'Miloš Drinčić',
    number: 5,
    position: 'Defender',
    nationality: 'Montenegro',
    flag: '🇲🇪',
    appearances: 38,
    goals: 3,
    assists: 1,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sq-7',
    name: 'Sachin Suresh',
    number: 1,
    position: 'Goalkeeper',
    nationality: 'India',
    flag: '🇮🇳',
    appearances: 31,
    goals: 0,
    assists: 0,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sq-8',
    name: 'Pritam Kotal',
    number: 24,
    position: 'Defender',
    nationality: 'India',
    flag: '🇮🇳',
    appearances: 42,
    goals: 1,
    assists: 3,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
];
