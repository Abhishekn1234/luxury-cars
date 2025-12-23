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
exports.createCar = exports.ValidationError = void 0;
const selling_1 = require("../models/selling");
const mongoose_1 = require("mongoose");
class ValidationError extends mongoose_1.Error {
    constructor(message) {
        super(message);
        this.status = 400; // Bad Request
    }
}
exports.ValidationError = ValidationError;
const createCar = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if email or mobile already exists
    const existingCar = yield selling_1.Car.findOne({
        $or: [{ email: data.email }, { mobile: data.mobile }],
    });
    if (existingCar) {
        if (existingCar.email === data.email) {
            throw new ValidationError("Email already exists");
        }
        if (existingCar.mobile === data.mobile) {
            throw new ValidationError("Mobile number already exists");
        }
    }
    // If validation passes, create a new car
    const car = new selling_1.Car(data);
    return car.save();
});
exports.createCar = createCar;
