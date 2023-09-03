import axios from "axios"
import Film from "../models/Film.js";
import dayjs from "dayjs";

const loadData = async () => {
    const swapiUrl = 'https://swapi.dev/api/films/';

    try {
        const checkLoadedData = await Film.find();
        if(checkLoadedData.length > 0) return

        const response = await axios.get(swapiUrl);

        if (response.status === 200) {
            const { data } = response;
            const result = data.results.map(item => {
                return {
                    title: item.title,
                    release_date: dayjs(item.release_date, {format: 'YYYY-MM-DD'}),
                    comments: [],
                    comment_count: 0
                }
            })

            await Film.create(result)
            console.log('Data loaded from SWAP API')

        } else {
            createError(404, `SWAPI request failed with status code ${response.status}`)
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export { loadData }