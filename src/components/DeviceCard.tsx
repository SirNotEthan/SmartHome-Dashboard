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
        <div className={`bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 transition-all duration-200 hover:bg-slate-800/80 hover:border-slate-600/50 ${size === 'large' ? 'p-8' : size === 'small' ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-slate-300 font-medium ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
                    {title}
                </h3>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                    {icon}
                </div>
            </div>
            <div className="mb-4">
                <span className={`font-light text-white ${size === 'large' ? 'text-5xl' : 'text-3xl'}`}>
                    {value}
                </span>
                {unit && <span className="text-slate-400 text-lg ml-2">{unit}</span>}
            </div>
            {children}
        </div>
    );
}