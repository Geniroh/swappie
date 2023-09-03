import Film from "../models/Film.js";
import { createError } from "../utils/error.js";

const getFilms = async (req, res, next) => {
    try {
        const films = await Film.find().sort({ release_date: 1 });
        res.status(200).json(films);
    } catch (error) {
        next(error);
    }
};


const addFilmComment = async (req, res, next) => {
    const filmId = req.params.id;
    const { message } = req.body;

    try {
        if (filmId && message) {
            const film = await Film.findOne({ _id: filmId });

            if (film) {
                if (message.length <= 500) {
                    const comment = {
                        message,
                        date: new Date(),
                    };

                    film.comments.push(comment);
                    film.comments.sort((a, b) => b.date - a.date);
                    film.comment_count = film.comments.length;

                    await film.save();

                    res.status(200).json(film);
                } else {
                    createError(400, "Comment length should be limited to 500 characters");
                }
            } else {
                createError(404, "Couldn't find the specified film record");
            }
        } else {
            createError(400, "Invalid request: filmId and message are required");
        }
    } catch (error) {
        next(error);
    }
};

const getFilmById = async (req, res, next) => {
    const filmId = req.params.id;

    try {
        if (filmId) {
            const film = await Film.findOne({ _id: filmId });
            if (film) {
                film.comments.sort((a, b) => b.date - a.date);
                res.status(200).json(film);
            } else {
                createError(404,"Couldn't find the specified film record");
            }
        } else {
            createError(400,"Invalid request: filmId is required");
        }
    } catch (error) {
        next(error);
    }
};


export { getFilms, addFilmComment, getFilmById }
