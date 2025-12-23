import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sellingCar from "./features/SellingCar/routes/selling"
dotenv.config();
import contactRoutes from "./features/ContactUs/routes/contact";
import { connectDB } from './features/config/db';
import path from 'path';
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://luxury-cars-nu.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // origin allowed
    } else {
      callback(new Error("Not allowed by CORS")); // origin not allowed
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", contactRoutes);
app.use('/api/selling',sellingCar);
// Example route
app.get('/', (req, res) => {
  res.send('API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
