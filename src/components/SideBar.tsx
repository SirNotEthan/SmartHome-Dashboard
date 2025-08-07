import { Home } from 'lucide-react';

export default function SideBar() {
    return (
        <div className="w-80 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/30 flex flex-col">
            <div className="p-6 border-b border-slate-800/50">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-2xl">
                         🏠   
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-white">SmartHome</h1>
                        <p className="text-slate-400 text-sm">Hello, User!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}