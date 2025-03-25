const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const companiesRouter = require('./routes/companies');
const reviewsRouter = require('./routes/reviews');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companiesRouter);
app.use('/api/reviews', reviewsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 