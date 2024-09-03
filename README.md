# Weather App

A simple weather app using Flask for the backend and React for the frontend. The app allows users to enter a city name and fetch the current weather data.

## Features
- Fetch current weather by city.
- Display detailed weather information (temperature, description, humidity, wind speed).

## Extra Features
- Optional 5-day forecast.
- Geolocation-based weather data.
- Weather icons for better visualization.

## Setup and Run

### Backend (Flask)
1. Create a virtual environment:
python -m venv venv

2. Install the dependencies:
pip install -r requirements.txt

3. Run the Flask app:
python app.py

### Frontend (React)
1. Navigate to the `frontend` folder and install dependencies:
cd frontend npm install

2. Run the React app:
npm start

shell
## API
- The backend fetches data from the OpenWeatherMap API. Make sure to replace `your_openweathermap_api_key` with your actual API key.

## Demo Video
Please find the demo video here: [Demo Video Link]

## Note
Ensure the backend and frontend servers are running simultaneously for the app to function correctly.
