import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import WeatherWidget from "../components/WeatherWidget";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <div className="col-span-3 space-y-6">
            <WeatherWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
