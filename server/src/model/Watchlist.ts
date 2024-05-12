import mongoose, { Document, Model, Schema } from 'mongoose';

interface IWatchlist extends Document {
    watched: boolean;
    userId: string;
    movieId: string;
}

const WatchlistSchema: Schema<IWatchlist> = new mongoose.Schema({
    watched: {
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

export const Watchlist: Model<IWatchlist> = mongoose.model<IWatchlist>('Watchlist', WatchlistSchema);