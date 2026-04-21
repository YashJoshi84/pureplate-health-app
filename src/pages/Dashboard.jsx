import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanLine, ShoppingCart, CalendarDays, LineChart, 
  ChevronRight, Plus, Moon, Activity, CheckCircle2, 
  Coffee, UtensilsCrossed, Flame
} from 'lucide-react';

// ------------------------------------
// NUTRITION DATABASE MAPPING
// ------------------------------------
const NUTRITION_DB = {
  "Avocado Toast & Poached Eggs": { calories: 420, protein: 22, carbs: 28, fat: 21 },
  "Grilled Chicken Quinoa Bowl": { calories: 510, protein: 42, carbs: 35, fat: 16 },
  "Oatmeal with Almonds": { calories: 360, protein: 14, carbs: 40, fat: 12 },
  "Salmon & Asparagus": { calories: 480, protein: 39, carbs: 12, fat: 24 },
  "Baked Salmon & Asparagus": { calories: 480, protein: 38, carbs: 12, fat: 26 },
  "Greek Yogurt & Berries": { calories: 250, protein: 18, carbs: 24, fat: 5 },
  "Turkey Salad Wrap": { calories: 380, protein: 28, carbs: 32, fat: 14 },
  "Lentil Soup": { calories: 320, protein: 18, carbs: 45, fat: 4 },
  "Leftover Lentil Soup": { calories: 320, protein: 18, carbs: 45, fat: 4 },
  "Zucchini Noodles with Pesto": { calories: 280, protein: 8, carbs: 14, fat: 22 },
  "Green Smoothie": { calories: 210, protein: 5, carbs: 42, fat: 3 },
  "Chickpea Salad": { calories: 410, protein: 16, carbs: 48, fat: 18 },
  "Lean Steak with Sweet Potatoes": { calories: 560, protein: 46, carbs: 40, fat: 22 },
  "Protein Pancakes": { calories: 380, protein: 32, carbs: 36, fat: 10 },
  "Chicken Caesars Salad": { calories: 450, protein: 35, carbs: 15, fat: 28 },
  "Healthy Tacos": { calories: 490, protein: 30, carbs: 45, fat: 18 },
  "Scrambled Eggs": { calories: 280, protein: 20, carbs: 4, fat: 20 },
  "Tuna Salad Sandwiches": { calories: 420, protein: 32, carbs: 36, fat: 14 },
  "Homemade Cauliflower Pizza": { calories: 520, protein: 24, carbs: 30, fat: 28 },
  "Chia Seed Pudding": { calories: 290, protein: 10, carbs: 25, fat: 16 },
  "Roast Chicken": { calories: 460, protein: 42, carbs: 0, fat: 25 },
  "Meal Prep: Rice Bowls": { calories: 500, protein: 35, carbs: 55, fat: 12 }
};

const DEFAULT_MACROS = { calories: 400, protein: 25, carbs: 40, fat: 15 };

// ------------------------------------
// SCALABLE DATA FETCHING HOOK
// ------------------------------------
// This architecture allows easily swapping localStorage with a real API later.
function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [todayMeals, setTodayMeals] = useState({});
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [stats, setStats] = useState({ todayPlanned: 0, weeklyPlanned: 0, groceries: 0 });
  const [completed, setCompleted] = useState({ Breakfast: false, Lunch: false, Dinner: false });

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    // Simulate API fetch delay
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // In the future, replace this block with an API call:
        // const response = await fetch('/api/dashboard/today');
        // const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 600));

        const savedPlanner = localStorage.getItem('pureplate_planner');
        const parsedPlan = savedPlanner ? JSON.parse(savedPlanner) : {};
        
        let totalWeekly = 0;
        Object.keys(parsedPlan).forEach(day => {
          if(parsedPlan[day].Breakfast) totalWeekly++;
          if(parsedPlan[day].Lunch) totalWeekly++;
          if(parsedPlan[day].Dinner) totalWeekly++;
        });

        const todaysData = parsedPlan[currentDay] || { Breakfast: "", Lunch: "", Dinner: "" };
        let todayCount = 0;
        if (todaysData.Breakfast) todayCount++;
        if (todaysData.Lunch) todayCount++;
        if (todaysData.Dinner) todayCount++;

        const calcTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
        
        ['Breakfast', 'Lunch', 'Dinner'].forEach(slot => {
          const mealName = todaysData[slot]?.trim();
          if (mealName) {
             const info = NUTRITION_DB[mealName] || DEFAULT_MACROS;
             calcTotals.calories += info.calories;
             calcTotals.protein += info.protein;
             calcTotals.carbs += info.carbs;
             calcTotals.fat += info.fat;
          }
        });

        setTodayMeals(todaysData);
        setTotals(calcTotals);
        setStats({
           todayPlanned: todayCount,
           weeklyPlanned: totalWeekly,
           groceries: totalWeekly * 4 
        });

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentDay]);

  const toggleComplete = (meal) => {
    setCompleted(prev => ({ ...prev, [meal]: !prev[meal] }));
  };

  return { isLoading, todayMeals, totals, stats, completed, toggleComplete, currentDay };
}

// ------------------------------------
// DASHBOARD COMPONENT
// ------------------------------------
export default function Dashboard() {
  const { user } = useAuth();
  const { isLoading, todayMeals, totals, stats, completed, toggleComplete, currentDay } = useDashboardData();
  
  const firstName = user?.user_metadata?.full_name?.split(' ')[0];
  const greeting = firstName ? `Good morning, ${firstName}` : "Welcome back";

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{greeting}</h1>
          <p className="text-slate-500 mt-2 text-lg font-medium">
             You have {stats.todayPlanned} meals planned for today. Let's stay on track! 🎯
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/planner" className="px-5 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition shadow-sm shadow-emerald-500/20 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> Edit Planner
          </Link>
        </div>
      </header>

      {/* 4. Weekly Health Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Flame/>} label="Streak" value="12 Days" trend="Keep going!" bgColor="bg-orange-500/10" textColor="text-orange-600" />
        <StatCard icon={<CalendarDays/>} label="Today's Plan" value={`${stats.todayPlanned}/3`} trend="Meals locked in" bgColor="bg-emerald-500/10" textColor="text-emerald-600" />
        <StatCard icon={<Activity/>} label="Weekly Plan" value={`${stats.weeklyPlanned}/21`} trend="Total meals prepped" bgColor="bg-blue-500/10" textColor="text-blue-600" />
        <StatCard icon={<ShoppingCart/>} label="Grocery List" value={`${stats.groceries}`} trend="Estimated items" bgColor="bg-indigo-500/10" textColor="text-indigo-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          {/* 2. Today's Plan */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Today's Nutrition Plan <span className="text-emerald-500 ml-2">({currentDay})</span></h2>
              <Link to="/planner" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center">
                Full Week <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            {stats.todayPlanned > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {['Breakfast', 'Lunch', 'Dinner'].map((slot, index) => {
                   const mealName = todayMeals[slot];
                   if (!mealName) return null;
                   
                   const info = NUTRITION_DB[mealName] || DEFAULT_MACROS;
                   const icon = slot === 'Breakfast' ? <Coffee className="w-5 h-5 text-amber-500"/> : 
                                slot === 'Lunch' ? <UtensilsCrossed className="w-5 h-5 text-emerald-600" /> :
                                <Moon className="w-5 h-5 text-indigo-500" />;

                   return (
                     <MealCard 
                       key={index}
                       type={slot}
                       title={mealName} 
                       cals={info.calories} 
                       icon={icon} 
                       isDone={completed[slot]}
                       onToggle={() => toggleComplete(slot)}
                     />
                   );
                })}
              </div>
            ) : (
              <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4 text-slate-400">
                   <CalendarDays className="w-8 h-8" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 mb-2">No meals planned for today</h3>
                 <p className="text-slate-500 max-w-sm mb-6 font-medium">Jump into the weekly planner to design your meals and generate exact nutrition macros automatically.</p>
                 <Link to="/planner" className="px-8 py-3.5 bg-emerald-50 text-emerald-700 rounded-xl font-bold hover:bg-emerald-100 transition-colors">
                   Plan Today's Meals
                 </Link>
              </div>
            )}
          </section>

          {/* 3. Quick Actions Grid */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <ActionCard to="/analyzer" icon={<ScanLine className="w-6 h-6"/>} title="Analyzer" desc="Find better swaps" />
               <ActionCard to="/grocery" icon={<ShoppingCart className="w-6 h-6"/>} title="Grocery" desc="Auto list" />
               <ActionCard to="/planner" icon={<CalendarDays className="w-6 h-6"/>} title="Planner" desc="Edit week" />
               <ActionCard to="/dashboard" icon={<LineChart className="w-6 h-6"/>} title="Progress" desc="Analytics" />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Daily Progress */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border-t-4 border-t-emerald-500 hover:shadow-xl transition-shadow relative overflow-hidden">
             
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] z-0 pointer-events-none"></div>

             <h3 className="font-bold text-slate-900 mb-8 flex items-center justify-between relative z-10">
                <span className="flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-500"/> Macro Targets</span>
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-500 text-right uppercase tracking-wider">Estimated</span>
             </h3>
             {stats.todayPlanned > 0 ? (
               <div className="space-y-6 relative z-10">
                  <ProgressBar label="Calories" current={totals.calories} max={2200} unit=" kcal" color="bg-orange-500" />
                  <ProgressBar label="Protein" current={totals.protein} max={140} unit="g" color="bg-emerald-500" />
                  <ProgressBar label="Carbs" current={totals.carbs} max={250} unit="g" color="bg-blue-500" />
                  <ProgressBar label="Fat" current={totals.fat} max={70} unit="g" color="bg-amber-500" />
               </div>
             ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 relative z-10">
                  <p className="text-slate-500 text-sm font-bold">Add meals to calculate macro load.</p>
                </div>
             )}
          </section>
          
          {/* 5. Recent Activity Feed */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
             <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
             <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-slate-100">
               <ActivityItem time="Just now" title="Dashboard Accessed" desc="Viewed daily plan" isNew/>
               <ActivityItem time="2h ago" title="Planner Updated" desc={`Modified meals for ${currentDay}`} dotColor="border-blue-500" />
               <ActivityItem time="1d ago" title="Joined PurePlate" desc="Account successfully configured." dotColor="border-indigo-500" />
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
      <p className="text-xs font-bold text-slate-500 mb-1 tracking-wide uppercase">{label}</p>
      <h4 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{value}</h4>
      <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">{trend}</p>
    </div>
  );
}

function MealCard({ type, title, cals, icon, isDone, onToggle }) {
  const getBadgeColor = (type) => {
     if(type === 'Breakfast') return 'bg-amber-100 text-amber-800';
     if(type === 'Lunch') return 'bg-emerald-100 text-emerald-800';
     return 'bg-indigo-100 text-indigo-800';
  }

  return (
    <div className={`p-6 rounded-3xl border transition-all ${isDone ? 'bg-slate-50 border-slate-200 opacity-80 shadow-inner' : 'bg-white border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${getBadgeColor(type)}`}>
          {type}
        </span>
      </div>
      <h3 className={`font-bold text-lg mb-1 leading-tight line-clamp-2 ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{title}</h3>
      <p className={`text-sm font-bold mb-5 ${isDone ? 'text-slate-400' : 'text-slate-500'}`}>{cals} cal estimate</p>
      
      {isDone ? (
        <button onClick={onToggle} className="w-full py-3 bg-slate-100 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm flex justify-center items-center gap-2 hover:bg-slate-200 transition-colors">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Logged
        </button>
      ) : (
        <button onClick={onToggle} className="w-full py-3 bg-slate-900 text-white hover:bg-slate-800 font-bold rounded-xl text-sm flex justify-center items-center gap-2 transition-colors cursor-pointer shadow-md shadow-slate-900/10">
          <Plus className="w-4 h-4" /> Log as Eaten
        </button>
      )}
    </div>
  );
}

function ActionCard({ to, icon, title, desc }) {
  return (
    <Link to={to} className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-emerald-200 transition-all flex flex-col items-center text-center">
       <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:-translate-y-1 group-hover:text-emerald-600 transition-all text-slate-600 flex items-center justify-center mb-4 shadow-sm">
         {icon}
       </div>
       <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
       <p className="text-xs text-slate-500 mt-1 font-medium">{desc}</p>
    </Link>
  );
}

function ProgressBar({ label, current, max, unit, color }) {
  const percent = Math.min(Math.round((current / max) * 100), 100);
  return (
    <div>
      <div className="flex justify-between text-sm font-bold mb-2">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-900">{current} <span className="text-slate-400 font-medium">/ {max}{unit}</span></span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out delay-300 relative`} style={{ width: `${percent}%` }}>
           <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20"></div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ time, title, desc, dotColor = "border-emerald-500", isNew }) {
  return (
    <div className="flex gap-4 relative z-10 group">
       <div className={`w-6 h-6 rounded-full border-4 border-white bg-slate-100 ${dotColor} shrink-0 mt-0.5 shadow-sm transition-transform group-hover:scale-110 flex items-center justify-center`}></div>
       <div>
         <div className="flex items-center gap-2">
           <h4 className="font-bold text-slate-900 text-sm whitespace-nowrap">{title}</h4>
           {isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">New</span>}
         </div>
         <p className="text-xs text-slate-500 mt-1 leading-relaxed font-bold">{desc}</p>
         <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-wide">{time}</p>
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
        {[1,2,3,4].map(i => <div key={i} className="h-36 bg-slate-100/80 rounded-3xl"></div>)}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-8 w-48 bg-slate-200 rounded-lg mb-6"></div>
          <div className="grid md:grid-cols-2 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-56 bg-slate-100/80 rounded-3xl"></div>)}
          </div>
        </div>
        <div className="space-y-8">
          <div className="h-80 bg-slate-100/80 rounded-3xl"></div>
          <div className="h-80 bg-slate-100/80 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}
