import { Bell, MoreHorizontal } from 'lucide-react';
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

export default function TopBar({ city = "Birmingham" }: WeatherWidgetProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

    const formatTime = (date: { toLocaleTimeString: (arg0: string, arg1: { hour: string; minute: string; hour12: boolean; }) => any; }) => {
        return date.toLocaleTimeString('en-UK', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };


    const formatDate = (date: { toLocaleDateString: (arg0: string, arg1: { weekday: string; month: string; day: string; }) => any; }) => {
        return date.toLocaleDateString('en-UK', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };
    return (
        <div className="h-20 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 flex items-center justify-between px-8">
            <div className="flex items-center space-x-6">
                <div>
                    <div className="text-2xl font-light text-gray-100">{formatTime(currentTime)}</div>
                    <div className="text-gray-500 text-sm font-medium">{formatDate(currentTime)}</div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-900/80 border border-gray-700/30 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                    {loading ? (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-gray-400"></div>
                            <span className="text-gray-400 text-sm font-medium">Loading...</span>
                        </div>
                    ) : error ? (
                        <div className="text-gray-400 text-sm font-medium">Weather unavailable</div>
                    ) : weather ? (
                        <>
                            <div className="text-2xl">{weather.icon}</div>
                            <div>
                                <div className="text-gray-100 font-semibold">{weather.temp}°C</div>
                                <div className="text-gray-400 text-xs font-medium">{weather.condition}</div>
                            </div>
                        </>
                    ) : null}
                </div>
                <div className="flex space-x-3">
                    <button className="w-11 h-11 bg-gray-900/60 border border-gray-700/40 rounded-xl flex items-center justify-center hover:bg-gray-800/80 hover:border-gray-600/50 transition-all duration-200">
                        <Bell className="w-5 h-5 text-gray-300" />
                    </button>
                    <button className="w-11 h-11 bg-gray-900/60 border border-gray-700/40 rounded-xl flex items-center justify-center hover:bg-gray-800/80 hover:border-gray-600/50 transition-all duration-200">
                        <MoreHorizontal className="w-5 h-5 text-gray-300" />
                    </button>
                </div>
            </div>
        </div>
    )
}