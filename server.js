const express = require('express');
const cors = require('cors');
const axios = require('axios');
const port = 3001;
const app = express();

app.use(cors());

app.get('/api/getCityInfo/:latlng', async (req, res) => {
  const { latlng } = req.params;
  const latt = latlng.split(',')[0];
  const long = latlng.split(',')[1];

  const url = `http://metaweather.com/api/location/search/?lattlong=${latt},${long}`;

  await axios
    .get(url)
    .then((data) => res.json(data.data))
    .catch((error) => res.send(error));
});

app.get('/api/weather/:woeid', async (req, res) => {
  const { woeid } = req.params;

  const url = `http://metaweather.com/api/location/${woeid}`;

  await axios
    .get(url)
    .then((data) => res.json(data.data))
    .catch((error) => res.send(error));
});

app.post('/api/search/:city', async (req, res) => {
  const { city } = req.params;

  const url = `http://metaweather.com/api/location/search/?query=${city}`;

  await axios
    .get(url)
    .then((data) => res.json(data.data))
    .catch((error) => res.send(error));
});

app.listen(port);
