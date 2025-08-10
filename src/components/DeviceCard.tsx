interface DeviceCardProps {
    title: string;
    value: React.ReactNode;
    unit?: string;
    icon: React.ReactNode;
    color: string;
    size?: 'normal' | 'large' | 'small';
    children?: React.ReactNode;
}

export default function DeviceCard({ title, value, unit, icon, color, size = 'normal', children }: DeviceCardProps) {
    return (
        <div className={`bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/40 transition-all duration-200 hover:bg-gray-900/90 hover:border-gray-600/50 ${size === 'large' ? 'p-8' : size === 'small' ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-gray-400 font-semibold ${size === 'large' ? 'text-lg' : 'text-sm'} uppercase tracking-wide`}>
                    {title}
                </h3>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} border border-gray-600/30`}>
                    {icon}
                </div>
            </div>
            <div className="mb-4">
                <span className={`font-semibold text-gray-100 ${size === 'large' ? 'text-5xl' : 'text-3xl'}`}>
                    {value}
                </span>
                {unit && <span className="text-gray-500 text-lg ml-2 font-medium">{unit}</span>}
            </div>
            {children}
        </div>
    );
}