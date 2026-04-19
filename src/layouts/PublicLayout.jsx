import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">PurePlate</h1>
        <div className="gap-4 flex items-center">
          <Link to="/login" className="px-4 py-2 text-slate-500 font-medium hover:text-emerald-600 transition">Login</Link>
          <Link to="/signup" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 shadow-sm transition">Get Started</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
