from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Set your OpenWeatherMap API key
API_KEY = 'c4b563ce29cb3e9a9ec3703b9ed3cc64'  # Replace this with your actual OpenWeatherMap API key

@app.route('/')
def home():
    return "Welcome to the Weather API. Use /api/weather with appropriate query parameters to get the weather data."

@app.route('/api/weather', methods=['GET'])
def get_weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({'error': 'Latitude and Longitude parameters are required'}), 400

    # Construct the API request URL for OpenWeatherMap One Call API
    url = f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        data = response.json()

        # Parse the response to get the relevant weather information
        weather = {
            'temperature': data['current']['temp'],
            'description': data['current']['weather'][0]['description'],
            'humidity': data['current']['humidity'],
            'wind_speed': data['current']['wind_speed']
        }

        return jsonify(weather)

    except requests.exceptions.HTTPError as http_err:
        return jsonify({'error': f"HTTP error occurred: {http_err}"}), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
