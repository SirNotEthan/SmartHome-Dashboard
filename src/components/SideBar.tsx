import { Home, Search, Monitor, Smartphone, Shield, Zap, Settings } from 'lucide-react';
import { useState } from 'react';

export default function SideBar() {
    const [viewMode, setViewMode] = useState('overview');
    return (
        <div className="w-80 bg-gray-900 backdrop-blur-xl border-r border-gray-800/30 flex flex-col">
            <div className="p-6 border-b border-slate-800/50">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-2xl">
                         🏠   
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-white">The Main House</h1>
                        <p className="text-slate-400 text-sm">Hello, Ethan!</p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search Devices..."
                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
                    />    
                </div>
            </div>

            <div className="p-6 flex-1">
                <div className="space-y-2 mb-8">
                    <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wide">Main Features</h4>
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
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                viewMode === id
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm">{label}</span>
                        </button>    
                    ))}
                </div>

                <div className="space-y-4">
                    <h4 className="text-slate-400 text-sm font-medium uppercase tracking-wide">Quick Stats</h4>
                    <div className="bg-slate-800/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300 text-sm">Energy Today</span>
                            <Zap className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div className="text-white text-xl font-light">150 kWh</div>
                        <div className="text-xs text-green-400 mt-1">↓ 4% from yesterday</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300 text-sm">Security</span>
                            <Shield className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="text-white text-xl font-light">Armed</div>
                        <div className="text-xs text-slate-400 mt-1">All zones secure</div>
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-slate-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-cecnter text-lg">

                    </div>
                    <div className="flex-1">
                        <div className="text-white font-medium">Ethan</div>
                        <div className="text-slate-400 text-xs">Developer</div>
                    </div>
                    <Settings className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    );
}