import express from "express";
import cors from "cors";
import filmRoutes from "./routes/films.js";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import { connectDB } from "./config/db.js";
import { loadData } from "./utils/loadData.js";


const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req,res,next) => {
    try {
        res.status(200).send("welcome to swappie API for more information check out our <a href='https://documenter.getpostman.com/view/15738942/2s9Y5eNKkK'>documentation</a>");
    } catch (error) {
        next(error)
    }
})

app.use('/api/films', filmRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    connectDB()
    loadData()
    console.log(`Server running on http://localhost:${PORT}`);
})