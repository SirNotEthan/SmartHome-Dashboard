import SideBar from '../components/SideBar';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg--slate-950 text-white">
      <div className="flex h-screen">
        <SideBar />
      </div>
    </div>
  );
}