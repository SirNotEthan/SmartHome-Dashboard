import { Home, Search, Monitor, Smartphone, Shield, Zap, Settings } from 'lucide-react';
import { useState } from 'react';

export default function SideBar() {
    const [viewMode, setViewMode] = useState('overview');
    return (
        <div className="w-80 bg-black/95 backdrop-blur-xl border-r border-gray-800/50 flex flex-col">
            <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl flex items-center justify-center text-2xl border border-gray-600/30">
                         🏠   
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-100">The Main House</h1>
                        <p className="text-gray-500 text-sm font-medium">Hello, Ethan!</p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Devices..."
                        className="w-full bg-gray-900/60 border border-gray-700/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gray-600/60 focus:bg-gray-900/80 transition-all duration-200"
                    />    
                </div>
            </div>

            <div className="p-6 flex-1">
                <div className="space-y-2 mb-8">
                    <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Main Features</h4>
                    {[
                        { id: 'overview', label: 'Overview', icon: Home },
                        { id: 'rooms', label: 'Rooms', icon: Monitor },
                        { id: 'devices', label: 'Devices', icon: Smartphone },
                        { id: 'security', label: 'Security', icon: Shield },
                        { id: 'energy', label: 'Energy', icon: Zap },
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setViewMode(id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                viewMode === id
                                    ? 'bg-gray-800/60 text-gray-100 border border-gray-700/40'
                                    : 'text-gray-500 hover:bg-gray-900/50 hover:text-gray-300'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm">{label}</span>
                        </button>    
                    ))}
                </div>

                <div className="space-y-4">
                    <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Quick Stats</h4>
                    <div className="bg-gray-900/60 border border-gray-800/40 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm font-medium">Energy Today</span>
                            <Zap className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div className="text-gray-100 text-xl font-semibold">150 kWh</div>
                        <div className="text-xs text-green-400 mt-1">↓ 4% from yesterday</div>
                    </div>
                    <div className="bg-gray-900/60 border border-gray-800/40 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-sm font-medium">Security</span>
                            <Shield className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="text-gray-100 text-xl font-semibold">Armed</div>
                        <div className="text-xs text-gray-500 mt-1 font-medium">All zones secure</div>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-800/60 border border-gray-700/40 rounded-full flex items-center justify-center text-lg">

                    </div>
                    <div className="flex-1">
                        <div className="text-gray-100 font-semibold">Ethan</div>
                        <div className="text-gray-500 text-xs font-medium">Developer</div>
                    </div>
                    <Settings className="w-5 h-5 text-gray-500 hover:text-gray-300 cursor-pointer transition-colors duration-200" />
                </div>
            </div>
        </div>
    );
}