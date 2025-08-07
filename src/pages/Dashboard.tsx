import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
        </div>
      </div>
    </div>
  );
}