"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitCarForm = void 0;
const selling_1 = require("../services/selling");
const submitCarForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // handle file upload if exists
        if (req.file) {
            data.vehicleImage = `/uploads/${req.file.filename}`;
        }
        const car = yield (0, selling_1.createCar)(data);
        return res.status(201).json({ success: true, car });
    }
    catch (err) {
        console.error(err);
        const status = err instanceof selling_1.ValidationError ? err.status : 500;
        const message = err.message || "Internal server error";
        return res.status(status).json({ success: false, message });
    }
});
exports.submitCarForm = submitCarForm;
