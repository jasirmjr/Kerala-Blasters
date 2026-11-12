import express from 'express';
import cors from 'cors';
import {
  NEWS_DATA,
  SHOP_DATA,
  VIDEOS_DATA,
  GALLERY_DATA,
  MATCHES_DATA,
  SQUAD_DATA,
} from './data.js';

const app = express();
const PORT = Number(process.env.PORT) || 5050;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    club: 'Kerala Blasters Football Club',
    anthem: 'Yennum Yellow',
    timestamp: new Date().toISOString(),
  });
});

// News Endpoints
app.get('/api/news', (req, res) => {
  const { category, search, limit } = req.query;
  let items = [...NEWS_DATA];

  if (category && category !== 'All') {
    items = items.filter(
      (n) => n.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }

  if (limit) {
    items = items.slice(0, Number(limit));
  }

  res.json({
    success: true,
    total: items.length,
    data: items,
  });
});

app.get('/api/news/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const item = NEWS_DATA.find(
    (n) => n.id === idOrSlug || n.slug === idOrSlug
  );

  if (!item) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }

  res.json({ success: true, data: item });
});

// Shop / Merchandise Endpoints
app.get('/api/shop', (req, res) => {
  const { type } = req.query;
  let items = [...SHOP_DATA];

  if (type && type !== 'All') {
    items = items.filter(
      (s) => s.type.toLowerCase() === String(type).toLowerCase()
    );
  }

  res.json({
    success: true,
    total: items.length,
    data: items,
  });
});

app.get('/api/shop/:id', (req, res) => {
  const item = SHOP_DATA.find((s) => s.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, data: item });
});

// Videos Endpoints
app.get('/api/videos', (req, res) => {
  const { limit } = req.query;
  let items = [...VIDEOS_DATA];
  if (limit) {
    items = items.slice(0, Number(limit));
  }
  res.json({
    success: true,
    total: items.length,
    data: items,
  });
});

// Gallery Endpoints
app.get('/api/gallery', (req, res) => {
  const { category, limit } = req.query;
  let items = [...GALLERY_DATA];

  if (category && category !== 'All') {
    items = items.filter((g) => g.category === category);
  }

  if (limit) {
    items = items.slice(0, Number(limit));
  }

  res.json({
    success: true,
    total: items.length,
    data: items,
  });
});

// Matches Endpoints
app.get('/api/matches', (_req, res) => {
  res.json({
    success: true,
    data: MATCHES_DATA,
  });
});

// Squad Endpoints
app.get('/api/squad', (req, res) => {
  const { position } = req.query;
  let items = [...SQUAD_DATA];
  if (position && position !== 'All') {
    items = items.filter((sq) => sq.position === position);
  }
  res.json({
    success: true,
    total: items.length,
    data: items,
  });
});

// Ticket Booking Endpoint
app.post('/api/tickets/book', (req, res) => {
  const { matchId, stand, quantity, name, email, phone } = req.body;

  if (!matchId || !stand || !quantity || !name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required booking fields',
    });
  }

  const bookingRef = `KBFC-TKT-${Date.now().toString(36).toUpperCase()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  res.json({
    success: true,
    message: 'Tickets booked successfully! See you at Kaloor in Yellow!',
    bookingReference: bookingRef,
    details: {
      matchId,
      stand,
      quantity,
      name,
      email,
      phone,
      gate: stand.includes('VIP') ? 'Gate 1 (West)' : 'Gate 3 (East)',
    },
  });
});

// Academy Registration Endpoint
app.post('/api/academy/register', (req, res) => {
  const { studentName, dob, guardianName, phone, email, district, preferredCenter } = req.body;

  if (!studentName || !phone || !email || !district) {
    return res.status(400).json({
      success: false,
      message: 'Missing required registration details.',
    });
  }

  res.json({
    success: true,
    message: `Application received for ${studentName}! The Young Blasters technical team will reach out within 48 hours for trial dates.`,
    applicationId: `YB-${Math.floor(100000 + Math.random() * 900000)}`,
  });
});

// Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email is required.' });
  }

  res.json({
    success: true,
    message: 'Welcome to the Manjappada family! Check your inbox for your 10% shop welcome voucher.',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ KBFC Official Backend running on http://localhost:${PORT}`);
});
