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

export default function WeatherWidget({ city = "London" }: WeatherWidgetProps) {
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
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500"></div>
                    <span className="text-white">Loading weather...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
                <h2 className="text-lg font-semibold mb-2 text-white">Weather Error</h2>
                <p className="text-white">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!weather) return null;

    return (
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Weather</h3>
                <MapPin className="w-4 h-4 text-cyan-400" />
            </div>

            <div className="text-center">
                <div className="text-6xl mb-2">
                    {weather.icon}
                </div>
                <div className="text-3xl font-light text-white mb-1">
                    {weather.temp}°
                </div>
                <div className="text-cyan-300/80 text-sm mb-4">{weather.condition}</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/10 rounded-lg p-2">
                        <div className="text-cyan-300/60">Humidity</div>
                        <div className="text-white font-medium">{weather.humidity}%</div>
                    </div>
                    <div className="bg-black/10 rounded-lg p-2">
                        <div className="text-cyan-300/60">Wind</div>
                        <div className="text-white font-medium">{weather.wind?.speed ?? '-'} km/h</div>
                    </div>
                </div>
            </div>
        </div>
    );
}