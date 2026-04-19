import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanLine, ShoppingCart, CalendarDays, LineChart, 
  ChevronRight, Plus, Apple, Clock, Flame, 
  UtensilsCrossed, Activity, CheckCircle2 
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Fake network delay to show the beautiful skeleton state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Extract first name from Supabase metadata if exists
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Friend';

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Good morning, {firstName}</h1>
          <p className="text-slate-500 mt-2 text-lg">You've hit your macro goals 3 days in a row. Keep it up! 🎯</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/planner" className="px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition shadow-sm shadow-emerald-500/20 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Log Meal
          </Link>
        </div>
      </header>

      {/* 4. Weekly Health Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Flame/>} label="Streak" value="3 Days" trend="+1 since yesterday" bgColor="bg-orange-500/10" textColor="text-orange-600" />
        <StatCard icon={<CheckCircle2/>} label="Meals Logged" value="12" trend="On track" bgColor="bg-emerald-500/10" textColor="text-emerald-600" />
        <StatCard icon={<ScanLine/>} label="Items Scanned" value="28" trend="4 warnings found" bgColor="bg-blue-500/10" textColor="text-blue-600" />
        <StatCard icon={<ShoppingCart/>} label="Grocery Items" value="14/42" trend="Pending trip" bgColor="bg-indigo-500/10" textColor="text-indigo-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          {/* 2. Today's Plan */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Today's Nutrition Plan</h2>
              <Link to="/planner" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center">
                Expand Diary <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
               <MealCard 
                 type="Breakfast" 
                 time="8:00 AM" 
                 title="Avocado Egg Toast" 
                 cals="320" 
                 icon={<Apple className="w-5 h-5 text-emerald-600" />} 
                 status="completed"
               />
               <MealCard 
                 type="Lunch" 
                 time="1:00 PM" 
                 title="Grilled Chicken Salad" 
                 cals="450" 
                 icon={<UtensilsCrossed className="w-5 h-5 text-blue-600" />} 
                 status="pending"
               />
               <MealCard 
                 type="Dinner" 
                 time="7:00 PM" 
                 title="Salmon & Quinoa" 
                 cals="520" 
                 icon={<UtensilsCrossed className="w-5 h-5 text-indigo-600" />} 
                 status="pending"
               />
               
               {/* Add Snack */}
               <button className="h-full min-h-[140px] rounded-3xl border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors flex flex-col items-center justify-center text-slate-500 hover:text-emerald-600 group">
                 <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center mb-2 transition-colors">
                   <Plus className="w-5 h-5" />
                 </div>
                 <span className="font-medium text-sm">Add Snack</span>
               </button>
            </div>
          </section>

          {/* 3. Quick Actions Grid */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <ActionCard to="/analyzer" icon={<ScanLine/>} title="Analyzer" desc="Scan Barcodes" />
               <ActionCard to="/grocery" icon={<ShoppingCart/>} title="Grocery" desc="Auto-List" />
               <ActionCard to="/planner" icon={<CalendarDays/>} title="Planner" desc="Week Setup" />
               <ActionCard to="/dashboard" icon={<LineChart/>} title="Progress" desc="View Charts" />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Daily Progress */}
          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border-b-4 border-b-emerald-500/20">
             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-500"/> Daily Progress</h3>
             <div className="space-y-6">
                <ProgressBar label="Calories" current={770} max={2100} unit="kcal" />
                <ProgressBar label="Protein" current={45} max={120} unit="g" />
                <ProgressBar label="Carbs" current={80} max={250} unit="g" color="bg-blue-500" />
                <ProgressBar label="Fats" current={28} max={65} unit="g" color="bg-orange-500" />
             </div>
          </section>
          
          {/* 5. Recent Activity Feed */}
          <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
             <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
             <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
               <ActivityItem time="10m ago" title="Breakfast Logged" desc="Avocado Toast (320 cal)" isNew/>
               <ActivityItem time="2h ago" title="Item Scanned" desc="Found added sugars in 'Healthy Oats'" dotColor="border-rose-500" />
               <ActivityItem time="1d ago" title="Grocery Trip" desc="Checked off 24 items" dotColor="border-blue-500" />
             </div>
          </section>
        </div>

      </div>
    </div>
  );
}

// ------------------------------------
// Reusable Components
// ------------------------------------

function StatCard({ icon, label, value, trend, bgColor, textColor }) {
  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all cursor-default">
      <div className={`w-12 h-12 rounded-2xl ${bgColor} flex items-center justify-center mb-4`}>
        <div className={textColor}>
          {icon}
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{value}</h4>
      <p className="text-xs font-semibold text-emerald-600">{trend}</p>
    </div>
  );
}

function MealCard({ type, time, title, cals, icon, status }) {
  const isDone = status === 'completed';
  return (
    <div className={`p-5 rounded-3xl border transition-all ${isDone ? 'bg-slate-50/50 border-slate-200 opacity-80' : 'bg-white border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-bold text-slate-900">{type}</span>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-lg text-slate-600 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {time}
        </span>
      </div>
      <h3 className={`font-bold text-lg mb-1 line-clamp-1 ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{title}</h3>
      <p className="text-slate-500 text-sm mb-4">{cals} kcal</p>
      {isDone ? (
        <button disabled className="w-full py-2.5 bg-slate-100 text-slate-400 font-medium rounded-xl text-sm flex justify-center items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Logged
        </button>
      ) : (
        <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-xl text-sm transition-colors cursor-pointer">
          Log as Eaten
        </button>
      )}
    </div>
  );
}

function ActionCard({ to, icon, title, desc }) {
  return (
    <Link to={to} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-emerald-200 transition-all flex flex-col items-center text-center">
       <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 group-hover:-translate-y-1 group-hover:text-emerald-600 shadow-sm transition-all text-slate-600 flex items-center justify-center mb-4">
         {icon}
       </div>
       <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
       <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </Link>
  );
}

function ProgressBar({ label, current, max, unit, color = "bg-emerald-500" }) {
  const percent = Math.min(Math.round((current / max) * 100), 100);
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-2">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-500">{current} <span className="text-slate-300">/ {max}{unit}</span></span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out delay-300`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function ActivityItem({ time, title, desc, dotColor = "border-emerald-500", isNew }) {
  return (
    <div className="flex gap-4 relative z-10 group">
       <div className={`w-6 h-6 rounded-full border-4 border-white bg-slate-100 ${dotColor} shrink-0 mt-0.5 shadow-sm transition-transform group-hover:scale-110`}></div>
       <div>
         <div className="flex items-center gap-2">
           <h4 className="font-semibold text-slate-900 text-sm whitespace-nowrap">{title}</h4>
           {isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">New</span>}
         </div>
         <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
         <p className="text-[11px] font-semibold text-slate-400 mt-1.5">{time}</p>
       </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-10 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <div className="h-10 w-64 bg-slate-200 rounded-2xl"></div>
          <div className="h-6 w-96 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-slate-200 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-36 bg-slate-100 rounded-3xl"></div>)}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-6"></div>
          <div className="grid md:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-48 bg-slate-100 rounded-3xl"></div>)}
          </div>
        </div>
        <div className="space-y-8">
          <div className="h-80 bg-slate-100 rounded-3xl"></div>
          <div className="h-80 bg-slate-100 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
