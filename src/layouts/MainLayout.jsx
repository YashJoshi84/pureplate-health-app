import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, ScanLine, ShoppingCart, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MainLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  const getActive = (path) => location.pathname === path ? "bg-emerald-50 text-emerald-600 font-medium" : "text-slate-600 hover:bg-slate-50";

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">PurePlate</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/dashboard" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${getActive('/dashboard')}`}><LayoutDashboard size={20} /> Dashboard</Link>
          <Link to="/planner" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${getActive('/planner')}`}><Calendar size={20} /> Planner</Link>
          <Link to="/analyzer" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${getActive('/analyzer')}`}><ScanLine size={20} /> Analyzer</Link>
          <Link to="/grocery" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${getActive('/grocery')}`}><ShoppingCart size={20} /> List</Link>
          <Link to="/settings" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${getActive('/settings')}`}><Settings size={20} /> Settings</Link>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button onClick={logout} className="w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition">Log Out</button>
        </div>
      </aside>

      {/* Main App Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0 relative">
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 z-50 py-2">
        <nav className="flex justify-around items-center p-2 px-4">
           <Link to="/dashboard" className="p-2 text-slate-400"><LayoutDashboard size={24} /></Link>
           <Link to="/planner" className="p-2 text-slate-400"><Calendar size={24} /></Link>
           <Link to="/analyzer" className="bg-emerald-500 text-white p-4 rounded-full -translate-y-6 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
             <ScanLine size={24} />
           </Link>
           <Link to="/grocery" className="p-2 text-slate-400"><ShoppingCart size={24} /></Link>
           <Link to="/settings" className="p-2 text-slate-400"><Settings size={24} /></Link>
        </nav>
      </div>
    </div>
  );
}
