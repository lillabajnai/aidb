import mongoose, { Document, Model, Schema } from 'mongoose';

interface IMovie extends Document {
    id: number,
    title: string;
    year: string;
    description: string;
    image: string;
}

const MovieSchema: Schema<IMovie> = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
});

export const Movie: Model<IMovie> = mongoose.model<IMovie>('Movie', MovieSchema);