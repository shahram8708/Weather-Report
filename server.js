const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/getWeather', async (req, res) => {
    const city = req.body.city;

    const apiKey = 'API_Key';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.send(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send('Error fetching weather data');
    }
});

app.get('/getWeather', async (req, res) => {
    const { lat, lon } = req.query;

    const apiKey = 'API_Key';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.send(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
