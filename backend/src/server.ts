import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sellingCar from "./features/SellingCar/routes/selling"
dotenv.config();
import contactRoutes from "./features/ContactUs/routes/contact";
import { connectDB } from './features/config/db';
import path from 'path';
const app = express();
app.use(cors());
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
