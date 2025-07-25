const express = require('express');
const app = express();
const PORT = 8000;
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const cors = require('cors');
require('dotenv');

const authRoute = require('./src/routes/auth');
const adminRoute = require('./src/routes/admin');
const userRoute = require('./src/routes/user');
const doctorRoute = require('./src/routes/doctor');
const publicRoute = require('./src/routes/public');
const webhookRoute = require('./src/routes/stripe_web_hook');
const errorHandling = require('./src/middleware/errorHandling');



mongoose.connect(process.env.DATA_BASE_URI).then(() => {
  console.log("connected complete !!")
}).catch(err => {
  console.log(err);
})


const normalizeOrigin = (origin) => {
  return origin?.endsWith('/') ? origin.slice(0, -1) : origin;
};


const allowedOrigins = [
  'https://docbook-pi.vercel.app',
  'https://docbook-pi.vercel.app/' // Include both with and without slash for safety
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const originClean = origin.endsWith('/') ? origin.slice(0, -1) : origin;

    if (allowedOrigins.some(allowed => {
      const allowedClean = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
      return originClean === allowedClean;
    })) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));




app.use('/public', express.static('public'));
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.originalUrl === '/stripe-webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(authRoute);
app.use(adminRoute);
app.use(userRoute);
app.use(doctorRoute);
app.use(publicRoute);
app.use(webhookRoute);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`app listen now on port ${PORT}`);
})
// stripe listen --forward-to http://localhost:8000/stripe-webhook