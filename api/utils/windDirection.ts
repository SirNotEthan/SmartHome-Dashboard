export function getWindDirection(degrees: number): string {
    const directions = [
        'N', 'NNE', 'NE', 'ENE',
        'E', 'ESE', 'SE', 'SSE',
        'S', 'SSW', 'SW', 'WSW',
        'W', 'WNW', 'NW', 'NNW'
    ];
    
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

export function getWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
        '01d': '☀️',  // clear sky day
        '01n': '🌙',  // clear sky night
        '02d': '⛅',  // few clouds day
        '02n': '☁️',  // few clouds night
        '03d': '☁️',  // scattered clouds
        '03n': '☁️',  // scattered clouds
        '04d': '☁️',  // broken clouds
        '04n': '☁️',  // broken clouds
        '09d': '🌦️', // shower rain
        '09n': '🌦️', // shower rain
        '10d': '🌧️', // rain day
        '10n': '🌧️', // rain night
        '11d': '⛈️', // thunderstorm
        '11n': '⛈️', // thunderstorm
        '13d': '❄️',  // snow
        '13n': '❄️',  // snow
        '50d': '🌫️', // mist
        '50n': '🌫️'  // mist
    };
    
    return iconMap[iconCode] || '🌤️';
}