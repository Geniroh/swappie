import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const filmSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    release_date: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    comment_count: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const Film = mongoose.model('Film', filmSchema);

export default Film;
