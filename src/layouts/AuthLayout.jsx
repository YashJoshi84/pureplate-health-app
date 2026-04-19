import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 border border-slate-100">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-emerald-600 inline-block mb-2">PurePlate</Link>
          <p className="text-slate-500 text-sm">Welcome back to clean eating.</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
