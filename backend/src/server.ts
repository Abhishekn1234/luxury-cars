import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sellingCar from "./features/SellingCar/routes/selling";
import whowareRoutes from "./features/About/routes/whoweareroutes";
dotenv.config();
import contactRoutes from "./features/ContactUs/routes/contact";
import { connectDB } from './features/config/db';
import adminRoutes from "./features/AdminAuth/routes/adminroutes";
import path from 'path';
import carRoutes from "./features/Collections/routes/carroutes";
import ContactMessage from './features/ContactUs/models/contact';
import Cars from './features/Collections/models/Cars';
import { Car } from './features/SellingCar/models/selling';
import services from './features/Services/models/services';
import servicesRoutes from "./features/Services/routes/servicesroutes";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://luxury-cars-nu.vercel.app",
  "https://luxury-cars-ms59.vercel.app",
  "https://luxury-cars-1-tydv.onrender.com",
  "https://luxury-cars-sable.vercel.app",
  "https://admin-luxury-cars.vercel.app"
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
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


app.use("/api", contactRoutes);
app.use("/api/services", servicesRoutes);
app.use('/api/selling',sellingCar);
app.use("/api/cars", carRoutes);
app.use('/api/auth',adminRoutes);
app.use('/api/about',whowareRoutes);
// Example route
app.get('/', (req, res) => {
  res.send('API running...');
});
app.get("/counts", async (req, res) => {
  try {
    const contactus = await ContactMessage.countDocuments();
    const cars = await Cars.countDocuments();        // inventory cars
    const sellingcars = await Car.countDocuments(); // if separate model
   const Services= await services.countDocuments();
    res.status(200).json({
      contactus,
      cars,
      sellingcars,
      Services
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch counts" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
