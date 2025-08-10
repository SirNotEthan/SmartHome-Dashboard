import { MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WeatherData {
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

interface WeatherWidgetProps {
    city?: string;
}

export default function WeatherWidget({ city = "Nuneaton" }: WeatherWidgetProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to fetch weather');
                }
                
                setWeather(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                console.error('Weather fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    if (loading) {
        return (
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-400"></div>
                    <span className="text-gray-100 font-medium">Loading weather...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
                <h2 className="text-lg font-semibold mb-2 text-gray-100">Weather Error</h2>
                <p className="text-gray-300">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-3 px-4 py-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700/90 transition-colors duration-200 font-medium"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-100">Weather</h3>
                <MapPin className="w-5 h-5 text-gray-400" />
            </div>

            <div className="text-center">
                <div className="text-6xl mb-3">
                    {weather.icon}
                </div>
                <div className="text-4xl font-light text-gray-100 mb-2">
                    {weather.temp}°
                </div>
                <div className="text-gray-400 text-sm mb-6 font-medium">{weather.condition}</div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-black/20 border border-gray-800/50 rounded-xl p-3">
                        <div className="text-gray-500 font-medium uppercase tracking-wide">Humidity</div>
                        <div className="text-gray-100 font-semibold text-lg mt-1">{weather.humidity}%</div>
                    </div>
                    <div className="bg-black/20 border border-gray-800/50 rounded-xl p-3">
                        <div className="text-gray-500 font-medium uppercase tracking-wide">Wind</div>
                        <div className="text-gray-100 font-semibold text-lg mt-1">{weather.wind?.speed ?? '-'} km/h</div>
                    </div>
                </div>
            </div>
        </div>
    );
}