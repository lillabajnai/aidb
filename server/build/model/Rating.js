"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RatingSchema = new mongoose_1.default.Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    isCritical: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    }
});
exports.Rating = mongoose_1.default.model('Rating', RatingSchema);
