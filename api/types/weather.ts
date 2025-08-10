export interface WeatherData {
    location: string;
    temp: number;
    feels_like: number;
    condition: string;
    icon: string;
    humidity: number;
    wind: {
        speed: number;
        deg: number;
        direction: string;
        gust?: number;
    };
    visibility: number;
    pressure: number;
    uv_index?: number;
    sunrise: number;
    sunset: number;
}

export interface OpenWeatherResponse {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        description: string;
        icon: string;
        main: string;
    }>;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    visibility: number;
    sys: {
        sunrise: number;
        sunset: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
}

export interface UVIndexResponse {
    value: number;
}