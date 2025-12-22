import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import contactRoutes from "./features/ContactUs/routes/contact";
import { connectDB } from './features/config/db';
const app = express();
app.use(cors());
connectDB();
app.use(express.json());
app.use("/api", contactRoutes);
// Example route
app.get('/', (req, res) => {
  res.send('API running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
