const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.imdb.com/chart/top';

const moviesData = {};

async function getHTML () {
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
};

getHTML().then((res) => {
    const $ = cheerio.load(res);
    $('.lister-lister>tr').each((i, movie) => {
        const title = $(movie).find('.titleColumn a').text();
        const rating = $(movie).find('.ratingColumn strong').text();
        moviesData[title] = rating;
    });
    fs.writeFile('topMoviesData.json', JSON.stringify(moviesData), (err) => {
        if (err) throw err;
        console.log('Please noticed that the top movies data was saved as: topMoviesData.json in the local scrapProj folder.');
    });
});
