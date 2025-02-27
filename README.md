# Travel App

### Introduction
The **Travel app** is a web application that helps users plan their trips to different destinations. The app fetches weather information, geographic location, and city images using various APIs such as **GeoNames**, **WeatherBit**, and **Pixabay**. It allows users to input a city and travel date to receive useful details that assist in planning their trip.

### Features
- **City Search**: Allows users to input the name of a city to fetch its geographic location.
- **Weather Info**: Displays weather details for the chosen city on the travel date.
- **City Images**: Displays images of the city using the Pixabay API.
- **Simple UI**: A clean and interactive user interface.

### Technologies Used
- **Frontend**: HTML, CSS, JavaScript 
- **Backend**: Node.js, Express.js
- **Bundler**: Webpack
- **APIs**:
  - **GeoNames**: To fetch geographic location data.
  - **WeatherBit**: To fetch weather data.
  - **Pixabay**: To fetch city images.

### How to Run the App

#### 1. **Setup the Local Environment**
   - Ensure that [Node.js](https://nodejs.org/) is installed on your machine.
   - Clone the project:
     ```bash
     git clone https://github.com/HidayaAwwad4/Travel-App.git
     cd travel-app
     ```
   - Create a `.env` file at the root of the project and add your API keys like so:
     ```env
     PORT=port-num
     GEONAMES_USERNAME=your_geonames_username
     WEATHER_API_KEY=your_weather_api_key
     PIXABAY_API_KEY=your_pixabay_api_key
     ```

#### 2. **Install Dependencies**
   Install the required dependencies using `npm`:
   ```bash
   npm install
