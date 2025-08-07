import { Bell, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TopBar() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
        <div className="h-20 bg-slate-900 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8">
            <div className="flex items-center space-x-6">
                <div>
                    <div className="text-2xl font-light text-white">{formatTime(currentTime)}</div>
                    <div className="text-slate-400 text-sm">{formatDate(currentTime)}</div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-slate-800 rounded-lg px-4 py-2">
                    <div className="text-2xl">⛅</div>
                    <div>
                        <div className="text-white font-medium">22 °C</div>
                        <div className="text-slate-400 text-xs">Sunny</div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                        <Bell className="w-5 h-5 text-slate-400" />
                    </button>
                    <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}