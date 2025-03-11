# Travel App

## Introduction
The **Travel App** is a web application that helps users plan their trips by providing weather forecasts, geographic locations, and city images. The app fetches data using various APIs such as **GeoNames**, **WeatherBit**, and **Pixabay**. Users can enter a city and travel date to receive relevant information for trip planning.

## Features
- **City Search**: Users can input a city name to get its geographic location.
- **Weather Info**: Displays weather conditions for the selected travel date.
- **City Images**: Fetches and displays city images using the Pixabay API.
- **Trip Management**: Users can save multiple trips without losing previous entries.
- **Modern UI**: A clean and interactive user interface built with HTML, CSS, and JavaScript.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Bundler**: Webpack
- **APIs Used**:
  - **GeoNames**: Retrieves geographic location data.
  - **WeatherBit**: Fetches weather data.
  - **Pixabay**: Provides city images.

## Installation and Setup
### 1. Prerequisites
Ensure the following are installed on your machine:
- [Node.js](https://nodejs.org/) (Recommended: **v20.12.2**)
- npm (Node Package Manager)

### 2. Clone the Repository
```bash
git clone https://github.com/HidayaAwwad4/Travel-App.git
cd travel-app
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add your API keys:
```env
PORT=8080
GEONAMES_USERNAME=your_geonames_username
WEATHER_API_KEY=your_weather_api_key
PIXABAY_API_KEY=your_pixabay_api_key
```

### 4. Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```

### 5. Run the Application
To start the development server, run:
```bash
npm run build
npm run dev
npm run start
```

### 6. Access the Application
Open your browser and go to:
```
http://localhost:8080
```

## Usage
1. Enter the destination city and travel date.
2. Click the "Search" button to fetch travel details.
3. View the weather forecast and city images.
4. Save your trip details for later reference.

## Troubleshooting
- If the app fails to start, ensure Node.js and npm are installed properly.
- Verify that API keys are correctly placed in the `.env` file.
- Run `npm run build` if there are issues with Webpack bundling.

## Additional Notes
- Webpack is used for module bundling and optimizing assets.
- API requests are handled via Express.js in the backend.

## License
This project is open-source and available under the MIT License.