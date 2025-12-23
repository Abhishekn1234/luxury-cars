"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const selling_1 = __importDefault(require("./features/SellingCar/routes/selling"));
dotenv_1.default.config();
const contact_1 = __importDefault(require("./features/ContactUs/routes/contact"));
const db_1 = require("./features/config/db");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api", contact_1.default);
app.use('/api/selling', selling_1.default);
// Example route
app.get('/', (req, res) => {
    res.send('API running...');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
