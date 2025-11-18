const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // This is already here, good!

// Load environment variables
dotenv.config();

const app = express();

// --- Middleware ---

// --- THIS IS YOUR FINAL CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:3000', // Your local React URL
  'https://billa-pi.vercel.app' // <-- Your Vercel URL is now included!
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
// --- END OF CORS CONFIGURATION ---


// Parse JSON request bodies
app.use(express.json()); 

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// --- API Routes ---
app.get('/api', (req, res) => {
  res.send('BILLA API Running');
});

// Define auth routes
app.use('/api/auth', require('./routes/auth'));
// Define subscription routes
app.use('/api/subscriptions', require('./routes/subscriptions'));
// Define analytics routes
app.use('/api/analytics', require('./routes/analytics')); 
// Define notification routes
app.use('/api/notify', require('./routes/notify'));

// --- Server Startup ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
