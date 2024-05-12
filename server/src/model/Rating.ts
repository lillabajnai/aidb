import mongoose, { Document, Model, Schema } from 'mongoose';

interface IRating extends Document {
    rating: number,
    comment: string;
    isCritical: boolean;
    userId: string;
    movieId: string;
}

const RatingSchema: Schema<IRating> = new mongoose.Schema({
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

export const Rating: Model<IRating> = mongoose.model<IRating>('Rating', RatingSchema);