import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.get("/api/location", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    const geoURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;
    const response = await axios.get(geoURL);

    if (response.data.totalResultsCount === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    const location = response.data.geonames[0];

    res.json({
      city: location.name,
      country: location.countryName,
      lat: location.lat,
      lon: location.lng,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching location data" });
  }
});

app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon are required" });
    }

    const weatherURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    const weatherResponse = await axios.get(weatherURL);

    if (!weatherResponse.data || !weatherResponse.data.data || !weatherResponse.data.data.length) {
      return res.status(404).json({ error: "Weather data not found" });
    }

    const weatherData = weatherResponse.data.data[0];
    res.json({
      description: weatherData.weather.description,
      temp: weatherData.temp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.get("/api/image", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const pixabayURL = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(
      city
    )}&image_type=photo`;

    const imageResponse = await axios.get(pixabayURL);

    if (!imageResponse.data.hits || imageResponse.data.hits.length === 0) {
      return res.json({ imageUrl: "https://via.placeholder.com/600x400?text=No+Image+Found" });
    }

    const imageUrl = imageResponse.data.hits[0].webformatURL;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching image data" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
