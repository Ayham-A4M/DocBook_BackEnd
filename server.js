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
// mongoose.connect('mongodb://127.0.0.1:27017/ClinicDb').then(() => {
//   console.log("connected complete !!")
// }).catch(err => {
//   console.log(err);
// })

const normalizeOrigin = (origin) => {
  return origin?.endsWith('/') ? origin.slice(0, -1) : origin;
};

const allowedOrigins = [
  'https://docbook-pi.vercel.app', // No trailing slash
];
app.use(cors({
  origin: (origin, callback) => {
    const normalizedOrigin = normalizeOrigin(origin);
    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());

// app.use(cors({
//   origin: 'http://localhost:5173', // Allow your frontend's origin
//   //   origin: 'http://192.168.1.5', // Allow your frontend's origin
//   credentials: true // If you're using cookies/sessions
// }));


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