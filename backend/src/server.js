const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static serving for the Built-in Admin Panel UI
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));

// Path to JSON DB
const DB_PATH = path.join(__dirname, 'data/db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return { menuItems: [], inquiries: [], reviews: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// ================= API ROUTES ================= //

// 1. Overview Analytics for CMS Dashboard
app.get('/api/analytics', (req, res) => {
  const db = readDB();
  const totalInquiries = db.inquiries.length;
  const pendingInquiries = db.inquiries.filter((i) => i.status === 'pending').length;
  const totalMenuItems = db.menuItems.length;
  const totalReviews = db.reviews.length;
  const confirmedEvents = db.inquiries.filter((i) => i.status === 'confirmed').length;

  res.json({
    totalInquiries,
    pendingInquiries,
    confirmedEvents,
    totalMenuItems,
    totalReviews,
    avgRating: 4.9,
  });
});

// 2. Menu CMS API
app.get('/api/menu', (req, res) => {
  const db = readDB();
  res.json(db.menuItems);
});

app.post('/api/menu', (req, res) => {
  const db = readDB();
  const newItem = {
    id: Date.now(),
    name: req.body.name,
    category: req.body.category || 'mains',
    price: Number(req.body.price) || 0,
    isVeg: req.body.isVeg !== undefined ? req.body.isVeg : true,
    badge: req.body.badge || '',
    description: req.body.description || '',
  };
  db.menuItems.unshift(newItem);
  writeDB(db);
  res.status(201).json(newItem);
});

app.delete('/api/menu/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.menuItems = db.menuItems.filter((m) => m.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Menu item deleted' });
});

// 3. Inquiries / Leads CMS API
app.get('/api/inquiries', (req, res) => {
  const db = readDB();
  res.json(db.inquiries);
});

app.post('/api/inquiries', (req, res) => {
  const db = readDB();
  const newInquiry = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    eventType: req.body.eventType || 'wedding',
    guestCount: Number(req.body.guestCount) || 100,
    eventDate: req.body.eventDate || new Date().toISOString().split('T')[0],
    status: 'pending',
    addons: req.body.addons || [],
    createdAt: new Date().toISOString(),
  };
  db.inquiries.unshift(newInquiry);
  writeDB(db);
  res.status(201).json({ success: true, inquiry: newInquiry });
});

app.patch('/api/inquiries/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  const index = db.inquiries.findIndex((i) => i.id === id);
  if (index !== -1) {
    db.inquiries[index] = { ...db.inquiries[index], ...req.body };
    writeDB(db);
    return res.json({ success: true, inquiry: db.inquiries[index] });
  }
  res.status(404).json({ error: 'Inquiry not found' });
});

app.delete('/api/inquiries/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.inquiries = db.inquiries.filter((i) => i.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Inquiry deleted' });
});

// 4. Reviews CMS API
app.get('/api/reviews', (req, res) => {
  const db = readDB();
  res.json(db.reviews);
});

app.post('/api/reviews', (req, res) => {
  const db = readDB();
  const newRev = {
    id: Date.now(),
    author: req.body.author,
    role: req.body.role || 'Guest Host',
    rating: Number(req.body.rating) || 5,
    comment: req.body.comment,
    status: 'approved',
    date: 'Just now',
  };
  db.reviews.unshift(newRev);
  writeDB(db);
  res.status(201).json(newRev);
});

app.delete('/api/reviews/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.reviews = db.reviews.filter((r) => r.id !== id);
  writeDB(db);
  res.json({ success: true, message: 'Review deleted' });
});

// Root route redirect to /admin
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend CMS server running on http://localhost:${PORT}`);
  console.log(`Admin Panel available at http://localhost:${PORT}/admin`);
});
