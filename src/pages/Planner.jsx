import { useState, useEffect } from 'react';
import { CalendarDays, ShoppingCart, Edit2, Trash2, Coffee, UtensilsCrossed, Moon, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

const DEMO_DATA = {
  Monday: { Breakfast: "Avocado Toast & Poached Eggs", Lunch: "Grilled Chicken Quinoa Bowl", Dinner: "Baked Salmon & Asparagus" },
  Tuesday: { Breakfast: "Greek Yogurt & Berries", Lunch: "Turkey Salad Wrap", Dinner: "Lentil Soup" },
  Wednesday: { Breakfast: "Oatmeal with Almonds", Lunch: "Leftover Lentil Soup", Dinner: "Zucchini Noodles with Pesto" },
  Thursday: { Breakfast: "Green Smoothie", Lunch: "Chickpea Salad", Dinner: "Lean Steak with Sweet Potatoes" },
  Friday: { Breakfast: "Protein Pancakes", Lunch: "Chicken Caesars Salad", Dinner: "Healthy Tacos" },
  Saturday: { Breakfast: "Scrambled Eggs", Lunch: "Tuna Salad Sandwiches", Dinner: "Homemade Cauliflower Pizza" },
  Sunday: { Breakfast: "Chia Seed Pudding", Lunch: "Roast Chicken", Dinner: "Meal Prep: Rice Bowls" }
};

export default function Planner() {
  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem('pureplate_planner');
    return saved ? JSON.parse(saved) : DEMO_DATA;
  });

  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  if (!DAYS.includes(selectedDay)) setSelectedDay('Monday');

  const [editingMeal, setEditingMeal] = useState(null); // 'Breakfast', 'Lunch', etc.
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem('pureplate_planner', JSON.stringify(plan));
  }, [plan]);

  const handleEditClick = (meal, currentValue) => {
    setEditingMeal(meal);
    setEditValue(currentValue || "");
  };

  const handleSave = () => {
    if (editingMeal) {
      setPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [editingMeal]: editValue.trim()
        }
      }));
      setEditingMeal(null);
    }
  };

  const handleDelete = (meal) => {
    setPlan(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [meal]: ""
      }
    }));
  };

  const loadDemo = () => setPlan(DEMO_DATA);

  const selectedDayData = plan[selectedDay] || {};

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 md:px-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-emerald-500" /> Weekly Planner
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Plan healthy meals for the week with a calm, focused interface.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadDemo} className="px-5 py-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold rounded-xl transition shadow-sm hidden md:block">
            Load Demo
          </button>
          <Link to="/grocery" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-[0_4px_15px_rgb(0,0,0,0.1)] flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Generate Groceries
          </Link>
        </div>
      </header>

      {/* Day Selector Tabs */}
      <div className="bg-white p-1.5 rounded-2xl md:rounded-full border border-slate-200 shadow-sm flex flex-col md:flex-row gap-1 mb-10 overflow-x-auto snap-x hide-scrollbar">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[100px] text-center px-4 py-3 rounded-full font-bold text-sm transition-all duration-300 snap-center focus:outline-none ${
                isSelected 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Spaced Cards Container */}
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        {MEALS.map(meal => (
          <SpaciousMealCard 
            key={meal} 
            meal={meal} 
            value={selectedDayData[meal]}
            isEditing={editingMeal === meal}
            editValue={editValue}
            setEditValue={setEditValue}
            onSave={handleSave}
            onEdit={() => handleEditClick(meal, selectedDayData[meal])}
            onDelete={() => handleDelete(meal)}
            onCancel={() => setEditingMeal(null)}
          />
        ))}
      </div>

    </div>
  );
}

function SpaciousMealCard({ meal, value, isEditing, editValue, setEditValue, onSave, onEdit, onDelete, onCancel }) {
  const getMealConfig = (m) => {
    if(m === 'Breakfast') return { icon: <Coffee className="w-6 h-6 text-amber-500" />, bg: "bg-amber-50" };
    if(m === 'Lunch') return { icon: <UtensilsCrossed className="w-6 h-6 text-emerald-500" />, bg: "bg-emerald-50" };
    return { icon: <Moon className="w-6 h-6 text-indigo-500" />, bg: "bg-indigo-50" };
  };

  const config = getMealConfig(meal);

  if (isEditing) {
    return (
      <div className="w-full bg-white rounded-3xl p-6 md:p-8 border-2 border-emerald-400 shadow-[0_8px_30px_rgb(16,185,129,0.15)] flex flex-col gap-4 animate-in zoom-in-95 duration-200">
         <div className="flex items-center gap-3 mb-2">
            <div className={`p-4 rounded-2xl ${config.bg}`}>{config.icon}</div>
            <h3 className="text-xl font-bold text-slate-800">{meal}</h3>
         </div>
         <textarea 
           autoFocus
           value={editValue}
           onChange={e => setEditValue(e.target.value)}
           placeholder={`What's for ${meal.toLowerCase()}? E.g. Avocado Toast...`}
           className="w-full text-lg font-medium text-slate-800 focus:outline-none resize-none bg-slate-50 p-5 rounded-2xl border border-slate-200 focus:border-emerald-300"
           rows={3}
           onKeyDown={e => {
             if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSave(); }
             if (e.key === 'Escape') { onCancel(); }
           }}
         />
         <div className="flex justify-end gap-3 mt-2">
           <button onClick={onCancel} className="px-6 py-3 font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
           <button onClick={onSave} className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20">Save Meal</button>
         </div>
      </div>
    );
  }

  if (!value) {
    return (
      <div 
        onClick={onEdit}
        className="w-full bg-slate-50/50 hover:bg-emerald-50 border-2 border-dashed border-slate-200 hover:border-emerald-300 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 cursor-pointer group transition-all duration-300 min-h-[140px]"
      >
         <div className={`p-5 rounded-2xl border border-transparent group-hover:border-emerald-200 transition-all ${config.bg} opacity-70 group-hover:opacity-100`}>
           {config.icon}
         </div>
         <div className="text-center md:text-left flex-1">
           <h3 className="text-xl font-bold text-slate-400 group-hover:text-emerald-700 transition-colors mb-1">Add {meal}</h3>
           <p className="text-slate-400 group-hover:text-emerald-600/70">Click to plan an ad-hoc meal for this slot.</p>
         </div>
         <PlusCircle className="w-10 h-10 text-slate-300 group-hover:text-emerald-500 transition-colors" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-200 transition-all flex flex-col md:flex-row items-center gap-6 min-h-[140px] group">
       <div className={`p-5 rounded-2xl ${config.bg}`}>
         {config.icon}
       </div>
       <div className="flex-1 text-center md:text-left w-full">
         <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">{meal}</span>
         <p className="text-2xl font-bold text-slate-900 leading-tight pr-0 md:pr-12">{value}</p>
       </div>
       <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
         <button onClick={onEdit} className="p-3 md:p-4 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-slate-500 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2">
           <Edit2 className="w-5 h-5" /> <span className="md:hidden">Edit</span>
         </button>
         <button onClick={onDelete} className="p-3 md:p-4 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-500 font-medium rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2">
           <Trash2 className="w-5 h-5" /> <span className="md:hidden">Remove</span>
         </button>
       </div>
    </div>
  );
}
