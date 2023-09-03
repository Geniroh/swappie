import express from 'express'
import { addFilmComment, getFilmById, getFilms } from '../controllers/films.controller.js';

const router = express.Router();

// get all films
router.get("/", getFilms);

router.get("/:id", getFilmById);

router.post("/comment/:id", addFilmComment);


export default router;