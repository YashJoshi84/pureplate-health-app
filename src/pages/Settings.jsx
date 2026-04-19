import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Settings as SettingsIcon, User, LogOut, CheckCircle2, 
  Moon, Sun, Bell, Target, Apple, ShieldAlert,
  ChevronRight, Save, Activity, Droplets
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_SETTINGS = {
  goal: "Maintain Health",
  diet: [],
  allergies: [],
  targets: { calories: 2200, protein: 140, water: 2500 },
  notifications: { meals: true, groceries: true, weekly: false },
  theme: "light"
};

const GOALS = ["Weight Loss", "Muscle Gain", "Maintain Health", "Better Eating Habits"];
const DIETS = ["Vegetarian", "Vegan", "High Protein", "Low Carb", "Gluten Free", "Dairy Free"];
const ALLERGIES = ["Nuts", "Eggs", "Dairy", "Soy", "Seafood"];

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pureplate_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Auto-sync theme to DOM body just for demo effect
  useEffect(() => {
    if (settings.theme === 'dark') {
       document.documentElement.classList.add('dark');
    } else {
       document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('pureplate_settings', JSON.stringify(settings));
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600); // fake network delay
  };

  const handleLogout = async () => {
     try {
       await signOut();
     } catch(e) {
       console.error("Logout failed", e);
     }
  };

  const name = user?.user_metadata?.full_name || "Guest User";
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const email = user?.email || "demo@pureplate.com";
  
  // Format join date from Supabase created_at, or mock it
  const createdDate = user?.created_at ? new Date(user.created_at).toLocaleDateString() : new Date().toLocaleDateString();

  const toggleArrayItem = (key, val) => {
    setSettings(prev => {
      const arr = prev[key];
      if (arr.includes(val)) return { ...prev, [key]: arr.filter(i => i !== val) };
      return { ...prev, [key]: [...arr, val] };
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 md:px-8 animate-in fade-in duration-500 pb-32">
      
      {/* Save Sticky Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-20">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-emerald-500" /> Settings
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Personalize your healthy lifestyle effortlessly.</p>
        </div>
        <div className="flex items-center gap-4">
           {showToast && (
             <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full flex items-center gap-2 animate-in slide-in-from-right">
               <CheckCircle2 className="w-4 h-4"/> Saved
             </span>
           )}
           <button 
             onClick={handleSave} 
             disabled={isSaving}
             className="px-8 py-3.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-70"
           >
             <Save className="w-5 h-5" /> {isSaving ? "Saving..." : "Save Preferences"}
           </button>
        </div>
      </div>

      <div className="space-y-10">
        
        {/* Profile Card */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-6">
           <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-sm shrink-0">
             {initials}
           </div>
           <div className="flex-1 text-center md:text-left">
             <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
             <p className="text-slate-500 font-medium">{email}</p>
             <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-wider">
               <User className="w-3 h-3"/> Active Member Since {createdDate}
             </div>
           </div>
        </section>

        {/* Health Goals */}
        <section>
          <SectionHeader icon={<Target className="text-emerald-500"/>} title="Primary Goal" desc="What are you trying to achieve?" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {GOALS.map(goal => (
              <button 
                key={goal}
                onClick={() => setSettings(prev => ({...prev, goal}))}
                className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all focus:outline-none ${settings.goal === goal ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm' : 'border-slate-100 bg-white text-slate-500 hover:border-emerald-200 hover:bg-slate-50'}`}
              >
                {goal}
              </button>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Dietary Prefs */}
          <section>
             <SectionHeader icon={<Apple className="text-emerald-500"/>} title="Diet" desc="Select your eating styles." />
             <div className="flex flex-wrap gap-3 mt-6">
               {DIETS.map(diet => {
                 const isActive = settings.diet.includes(diet);
                 return (
                   <button 
                     key={diet}
                     onClick={() => toggleArrayItem('diet', diet)}
                     className={`px-5 py-2.5 rounded-full border-2 font-bold text-sm transition-all focus:outline-none flex items-center gap-2 ${isActive ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'}`}
                   >
                     {isActive && <CheckCircle2 className="w-4 h-4"/>} {diet}
                   </button>
                 )
               })}
             </div>
          </section>

          {/* Allergies */}
          <section>
             <SectionHeader icon={<ShieldAlert className="text-rose-500"/>} title="Allergies" desc="Avoid these ingredients." />
             <div className="flex flex-wrap gap-3 mt-6">
               {ALLERGIES.map(allergy => {
                 const isActive = settings.allergies.includes(allergy);
                 return (
                   <button 
                     key={allergy}
                     onClick={() => toggleArrayItem('allergies', allergy)}
                     className={`px-5 py-2.5 rounded-full border-2 font-bold text-sm transition-all focus:outline-none flex items-center gap-2 ${isActive ? 'border-rose-500 bg-rose-500 text-white shadow-sm' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-300'}`}
                   >
                     {isActive && <CheckCircle2 className="w-4 h-4"/>} {allergy}
                   </button>
                 )
               })}
             </div>
          </section>
        </div>

        {/* Daily Targets */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
          <SectionHeader icon={<Activity className="text-emerald-500"/>} title="Daily Targets" desc="Set your macro numbers manually." />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
             <TargetInput 
               label="Calories" 
               val={settings.targets.calories} 
               unit="kcal" 
               color="text-orange-500 focus:border-orange-500" 
               onChange={(val) => setSettings(prev => ({...prev, targets: {...prev.targets, calories: Number(val)}}))} 
             />
             <TargetInput 
               label="Protein" 
               val={settings.targets.protein} 
               unit="g" 
               color="text-emerald-500 focus:border-emerald-500" 
               onChange={(val) => setSettings(prev => ({...prev, targets: {...prev.targets, protein: Number(val)}}))} 
             />
             <TargetInput 
               label="Water" 
               val={settings.targets.water} 
               icon={<Droplets className="w-4 h-4"/>}
               unit="ml" 
               color="text-blue-500 focus:border-blue-500" 
               onChange={(val) => setSettings(prev => ({...prev, targets: {...prev.targets, water: Number(val)}}))} 
             />
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Notifications */}
          <section>
            <SectionHeader icon={<Bell className="text-emerald-500"/>} title="Notifications" desc="Manage your alerts." />
            <div className="mt-6 space-y-4">
               <ToggleRow 
                 label="Meal Reminders" 
                 desc="Daily push for logging meals."
                 active={settings.notifications.meals} 
                 onChange={() => setSettings(prev => ({...prev, notifications: {...prev.notifications, meals: !prev.notifications.meals}}))} 
               />
               <ToggleRow 
                 label="Grocery Builder" 
                 desc="Alert me to prep groceries info."
                 active={settings.notifications.groceries} 
                 onChange={() => setSettings(prev => ({...prev, notifications: {...prev.notifications, groceries: !prev.notifications.groceries}}))} 
               />
               <ToggleRow 
                 label="Weekly Planning" 
                 desc="A Sunday reminder to plan ahead."
                 active={settings.notifications.weekly} 
                 onChange={() => setSettings(prev => ({...prev, notifications: {...prev.notifications, weekly: !prev.notifications.weekly}}))} 
               />
            </div>
          </section>

          {/* Theme */}
          <section>
            <SectionHeader icon={settings.theme === 'light' ? <Sun className="text-amber-500"/> : <Moon className="text-indigo-500"/>} title="Interface Theme" desc="Customize your UI." />
            <div className="grid grid-cols-2 gap-4 mt-6">
               <button 
                 onClick={() => setSettings(prev => ({...prev, theme: 'light'}))}
                 className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 font-bold transition-all ${settings.theme === 'light' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
               >
                  <Sun className="w-8 h-8" /> Light Mode
               </button>
               <button 
                 onClick={() => setSettings(prev => ({...prev, theme: 'dark'}))}
                 className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 font-bold transition-all ${settings.theme === 'dark' ? 'border-indigo-500 bg-indigo-900 text-indigo-100 shadow-sm' : 'border-slate-100 bg-slate-900 text-slate-400 hover:border-slate-700'}`}
               >
                  <Moon className="w-8 h-8" /> Dark Mode
               </button>
            </div>
          </section>

        </div>

        {/* Danger Zone */}
        <section className="pt-10 border-t border-slate-200 mt-10">
           <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Leave PurePlate</h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Sign out of your account session.</p>
              </div>
              <button 
                onClick={handleLogout}
                className="mt-4 md:mt-0 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 flex items-center gap-2 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors shadow-sm"
              >
                <LogOut className="w-4 h-4"/> Sign Out
              </button>
           </div>
        </section>

      </div>

    </div>
  );
}

// ---------------------------
// Helpers
// ---------------------------

function SectionHeader({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
        <p className="text-sm font-medium text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function TargetInput({ label, val, unit, color, icon, onChange }) {
  return (
    <div className="flex flex-col">
       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
         {label} {icon}
       </span>
       <div className="relative">
         <input 
           type="number" 
           value={val}
           onChange={(e) => onChange(e.target.value)}
           className={`w-full text-2xl font-bold bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-4 pr-14 focus:outline-none focus:bg-white transition-colors ${color}`}
         />
         <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 select-none">
           {unit}
         </div>
       </div>
    </div>
  );
}

function ToggleRow({ label, desc, active, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-slate-200 transition-colors cursor-pointer" onClick={onChange}>
       <div>
         <h4 className="font-bold text-slate-800">{label}</h4>
         <p className="text-xs font-medium text-slate-500 mt-0.5">{desc}</p>
       </div>
       <button 
         className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}
         role="switch"
         aria-checked={active}
       >
          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
       </button>
    </div>
  );
}
