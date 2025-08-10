import { Request, Response } from 'express';
import { WeatherData, OpenWeatherResponse, UVIndexResponse } from '../types/weather.ts';
import { getWindDirection, getWeatherIcon } from '../utils/windDirection.ts';

export async function getWeather(req: Request, res: Response): Promise<void> {
    const { city } = req.query;

    if (!city || typeof city !== 'string') {
        res.status(400).json({ error: 'Missing or invalid city name' });
        return;
    }
    
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    if (!apiKey) {
        res.status(500).json({ error: 'Weather API key not configured' });
        return;
    }

    try {
        // Fetch current weather data
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        if (!weatherResponse.ok) {
            if (weatherResponse.status === 404) {
                res.status(404).json({ error: 'City not found' });
                return;
            }
            throw new Error(`Weather API returned ${weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json() as OpenWeatherResponse;
        
        // Fetch UV index data using coordinates
        let uvIndex: number | undefined;
        try {
            const uvResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/uvi?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${apiKey}`
            );
            if (uvResponse.ok) {
                const uvData = await uvResponse.json() as UVIndexResponse;
                uvIndex = Math.round(uvData.value * 10) / 10; 
            }
        } catch (uvError) {
            console.warn('Failed to fetch UV index:', uvError);
            // UV index is optional, continue without it
        }

        const processedWeatherData: WeatherData = {
            location: weatherData.name,
            temp: Math.round(weatherData.main.temp),
            feels_like: Math.round(weatherData.main.feels_like),
            condition: weatherData.weather[0].description
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
            icon: getWeatherIcon(weatherData.weather[0].icon),
            humidity: weatherData.main.humidity,
            wind: {
                speed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
                deg: weatherData.wind.deg,
                direction: getWindDirection(weatherData.wind.deg),
                gust: weatherData.wind.gust ? Math.round(weatherData.wind.gust * 3.6) : undefined
            },
            visibility: Math.round(weatherData.visibility / 1000), // Convert meters to kilometers
            pressure: weatherData.main.pressure,
            uv_index: uvIndex,
            sunrise: weatherData.sys.sunrise,
            sunset: weatherData.sys.sunset
        };

        res.status(200).json(processedWeatherData);
    } catch (error) {
        console.error('Weather API Error:', error instanceof Error ? error.message : error);
        res.status(500).json({ 
            error: 'Failed to fetch weather data. Please try again later.' 
        });
    }
}