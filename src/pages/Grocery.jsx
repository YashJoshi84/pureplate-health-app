import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, PlusCircle, CheckCircle2, ChevronRight, Apple, Beef, Package, Trash2, CalendarDays, Droplet, Cookie, Search, Check, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const INGREDIENT_DB = {
  "Avocado Toast & Poached Eggs": [
    { name: "Whole Wheat Bread", category: "Pantry", qty: "1 loaf" },
    { name: "Avocado", category: "Produce", qty: "3 pcs" },
    { name: "Eggs", category: "Dairy", qty: "12 pcs" }
  ],
  "Grilled Chicken Quinoa Bowl": [
    { name: "Chicken Breast", category: "Protein", qty: "1 kg" },
    { name: "Quinoa", category: "Pantry", qty: "500 g" },
    { name: "Spinach", category: "Produce", qty: "2 bunches" },
    { name: "Cherry Tomatoes", category: "Produce", qty: "1 box" }
  ],
  "Baked Salmon & Asparagus": [
    { name: "Salmon Fillets", category: "Protein", qty: "4 pcs" },
    { name: "Asparagus", category: "Produce", qty: "2 bunches" },
    { name: "Lemon", category: "Produce", qty: "2 pcs" }
  ],
  "Greek Yogurt & Berries": [
    { name: "Greek Yogurt", category: "Dairy", qty: "1 large tub" },
    { name: "Mixed Berries", category: "Produce", qty: "2 boxes" },
    { name: "Honey", category: "Pantry", qty: "1 jar" }
  ],
  "Turkey Salad Wrap": [
    { name: "Sliced Turkey", category: "Protein", qty: "500 g" },
    { name: "Whole Wheat Wraps", category: "Pantry", qty: "1 pk" },
    { name: "Lettuce", category: "Produce", qty: "1 head" }
  ],
  "Lentil Soup": [
    { name: "Dry Lentils", category: "Pantry", qty: "1 bag" },
    { name: "Carrots", category: "Produce", qty: "1 bag" },
    { name: "Vegetable Broth", category: "Pantry", qty: "2 cartons" }
  ],
  "Oatmeal with Almonds": [
    { name: "Rolled Oats", category: "Pantry", qty: "1 canister" },
    { name: "Almonds", category: "Snacks", qty: "1 bag" },
    { name: "Almond Milk", category: "Dairy", qty: "1 carton" }
  ],
  "Leftover Lentil Soup": [],
  "Zucchini Noodles with Pesto": [
    { name: "Zucchini", category: "Produce", qty: "4 pcs" },
    { name: "Pesto Sauce", category: "Pantry", qty: "1 jar" },
    { name: "Parmesan", category: "Dairy", qty: "1 block" }
  ],
  "Green Smoothie": [
    { name: "Spinach", category: "Produce", qty: "1 bunch" }, 
    { name: "Bananas", category: "Produce", qty: "1 bunch" },
    { name: "Almond Milk", category: "Dairy", qty: "1 carton" }
  ],
  "Chickpea Salad": [
    { name: "Canned Chickpeas", category: "Pantry", qty: "2 cans" },
    { name: "Cucumber", category: "Produce", qty: "2 pcs" },
    { name: "Feta Cheese", category: "Dairy", qty: "1 block" }
  ],
  "Lean Steak with Sweet Potatoes": [
    { name: "Flank Steak", category: "Protein", qty: "800 g" },
    { name: "Sweet Potatoes", category: "Produce", qty: "4 pcs" },
    { name: "Broccoli", category: "Produce", qty: "2 heads" }
  ],
  "Protein Pancakes": [
    { name: "Pancake Mix", category: "Pantry", qty: "1 box" },
    { name: "Protein Powder", category: "Pantry", qty: "1 tub" },
    { name: "Eggs", category: "Dairy", qty: "1 pk" }
  ],
  "Chicken Caesars Salad": [
    { name: "Chicken Breast", category: "Protein", qty: "1 kg" },
    { name: "Romaine Lettuce", category: "Produce", qty: "2 heads" },
    { name: "Caesar Dressing", category: "Pantry", qty: "1 btl" }
  ],
  "Healthy Tacos": [
    { name: "Ground Turkey", category: "Protein", qty: "500 g" },
    { name: "Corn Tortillas", category: "Pantry", qty: "1 pk" },
    { name: "Avocado", category: "Produce", qty: "3 pcs" }
  ],
  "Scrambled Eggs": [
    { name: "Eggs", category: "Dairy", qty: "1 pk" },
    { name: "Whole Wheat Bread", category: "Pantry", qty: "1 loaf" },
    { name: "Milk", category: "Dairy", qty: "1 carton" }
  ],
  "Tuna Salad Sandwiches": [
    { name: "Canned Tuna", category: "Pantry", qty: "3 cans" },
    { name: "Greek Yogurt", category: "Dairy", qty: "1 tub" },
    { name: "Whole Wheat Bread", category: "Pantry", qty: "1 loaf" }
  ],
  "Homemade Cauliflower Pizza": [
    { name: "Cauliflower Crust", category: "Pantry", qty: "2 pks" },
    { name: "Tomato Sauce", category: "Pantry", qty: "1 jar" },
    { name: "Mozzarella", category: "Dairy", qty: "1 bag" }
  ],
  "Chia Seed Pudding": [
    { name: "Chia Seeds", category: "Pantry", qty: "1 bag" },
    { name: "Almond Milk", category: "Dairy", qty: "1 carton" },
    { name: "Maple Syrup", category: "Pantry", qty: "1 btl" }
  ],
  "Roast Chicken": [
    { name: "Whole Chicken", category: "Protein", qty: "1 whole" },
    { name: "Carrots", category: "Produce", qty: "1 bag" },
    { name: "Potatoes", category: "Produce", qty: "1 bag" }
  ],
  "Meal Prep: Rice Bowls": [
    { name: "Brown Rice", category: "Pantry", qty: "1 bag" },
    { name: "Chicken Breast", category: "Protein", qty: "1 kg" },
    { name: "Black Beans", category: "Pantry", qty: "2 cans" }
  ]
};

const CATEGORIES = ['Produce', 'Protein', 'Dairy', 'Pantry', 'Snacks', 'Others'];

export default function Grocery() {
  const [plannerEmpty, setPlannerEmpty] = useState(false);
  const [baseItems, setBaseItems] = useState([]);
  
  const [customItems, setCustomItems] = useState(() => {
    const saved = localStorage.getItem('pureplate_grocery_custom');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('pureplate_grocery_checked');
    return saved ? JSON.parse(saved) : {};
  });

  const [newItemName, setNewItemName] = useState("");
  const [newItemCat, setNewItemCat] = useState("Others");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 1. Pull data from Planner
    const savedPlanner = localStorage.getItem('pureplate_planner');
    if (!savedPlanner) {
      setPlannerEmpty(true);
      return;
    }

    const plan = JSON.parse(savedPlanner);
    const uniqueMap = new Map();
    let hasMeals = false;

    // 2. Map through everyday
    Object.values(plan).forEach(day => {
      Object.values(day).forEach(mealStr => {
        const meal = mealStr?.trim();
        if (meal) {
          hasMeals = true;
          const ingredients = INGREDIENT_DB[meal] || [
             // Fallback for custom user meals
             { name: `${meal} Ingredients`, category: "Others", qty: "1 pkg" }
          ];

          ingredients.forEach(ing => {
            if (!uniqueMap.has(ing.name)) {
              uniqueMap.set(ing.name, { ...ing, id: `base_${ing.name}` });
            }
          });
        }
      });
    });

    if (!hasMeals) {
      setPlannerEmpty(true);
    } else {
      setPlannerEmpty(false);
      setBaseItems(Array.from(uniqueMap.values()));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pureplate_grocery_custom', JSON.stringify(customItems));
  }, [customItems]);

  useEffect(() => {
    localStorage.setItem('pureplate_grocery_checked', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addCustomItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newId = `custom_${Date.now()}`;
    setCustomItems([...customItems, { id: newId, name: newItemName.trim(), category: newItemCat, qty: "1" }]);
    setNewItemName("");
  };

  const removeCustomItem = (id) => {
    setCustomItems(customItems.filter(item => item.id !== id));
    // Clean up checked state
    const newChecked = { ...checkedItems };
    delete newChecked[id];
    setCheckedItems(newChecked);
  };

  // Merge and group computation
  const allItems = [...baseItems, ...customItems].filter(i => 
     searchQuery === "" || i.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = allItems.filter(i => i.category === cat);
    return acc;
  }, {});

  const totalItems = allItems.length;
  const completedCount = allItems.filter(i => checkedItems[i.id]).length;
  const remainingCount = totalItems - completedCount;

  if (plannerEmpty && customItems.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 animate-in fade-in duration-500">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-emerald-500" /> Auto-Grocery List
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Your smart shopping companion linked natively to your weekly meal plans.</p>
        </header>

        <div className="w-full bg-white border-2 border-dashed border-emerald-200 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-sm max-w-3xl mx-auto">
           <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6 text-emerald-500">
             <CalendarDays className="w-10 h-10" />
           </div>
           <h3 className="text-2xl font-bold text-slate-900 mb-3">Plan meals first to generate groceries</h3>
           <p className="text-slate-500 max-w-md mb-8 text-lg">We automatically extract ingredients and smartly group them when you build out your weekly planner.</p>
           <Link to="/planner" className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
             Design Weekly Plan
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-emerald-500" /> Master Grocery List
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Generated intelligently from your synced weekly meal planner.</p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="text-right">
             <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Progress</div>
             <div className="text-2xl font-bold text-slate-900 leading-tight">{completedCount} <span className="text-slate-300">/</span> {totalItems}</div>
           </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-12 border border-slate-200">
         <div className="bg-emerald-500 h-full transition-all duration-700 relative" style={{ width: `${totalItems === 0 ? 0 : (completedCount/totalItems)*100}%` }}>
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20"></div>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* List Section */}
        <div className="lg:col-span-2 space-y-12">
           
           <div className="relative">
             <Search className="w-5 h-5 absolute left-4 top-4 text-slate-400" />
             <input type="text" placeholder="Search your list..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 shadow-sm" />
           </div>

           {CATEGORIES.map(category => {
             const items = groupedItems[category];
             if (items.length === 0) return null;

             const isAllChecked = items.every(i => checkedItems[i.id]);

             return (
               <section key={category} className="animate-in slide-in-from-bottom-4 duration-500">
                 <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <CategoryIcon cat={category} /> {category} 
                   {isAllChecked && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-2" />}
                 </h2>
                 <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
                   {items.map((item, idx) => {
                     const isChecked = checkedItems[item.id];
                     const isCustom = item.id.startsWith('custom_');
                     return (
                       <div key={item.id} onClick={() => toggleCheck(item.id)} className={`flex items-center justify-between p-4 px-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group ${isChecked ? 'bg-slate-50/50' : ''}`}>
                          <div className="flex items-center gap-4">
                            <button className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${isChecked ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/40' : 'border-2 border-slate-300 text-transparent group-hover:border-emerald-400'}`}>
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </button>
                            <div>
                               <h4 className={`font-bold transition-all ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{item.name}</h4>
                               {isCustom && !isChecked && <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Manual Add</span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                             <span className={`text-sm font-semibold px-3 py-1 rounded-lg ${isChecked ? 'bg-transparent text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{item.qty}</span>
                             {isCustom && (
                               <button onClick={(e) => { e.stopPropagation(); removeCustomItem(item.id); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:bg-rose-100 hover:text-rose-600 transition-colors">
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             )}
                          </div>
                       </div>
                     )
                   })}
                 </div>
               </section>
             )
           })}

        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-1 space-y-8">
           
           <div className="bg-emerald-900 rounded-3xl p-8 border border-emerald-800 text-white shadow-lg shadow-emerald-900/20 relative overflow-hidden">
             
             <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-800 rounded-bl-[100px] z-0 opacity-50"></div>

             <h3 className="font-bold text-xl mb-6 flex items-center gap-2 relative z-10">
               <PlusCircle className="w-6 h-6 text-emerald-400"/> Add Custom Item
             </h3>
             <form onSubmit={addCustomItem} className="space-y-4 relative z-10">
               <div>
                 <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 block">Item Name</label>
                 <input 
                   required
                   type="text" 
                   value={newItemName}
                   onChange={e => setNewItemName(e.target.value)}
                   className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-xl px-4 py-3 placeholder:text-emerald-500/50 focus:outline-none focus:border-emerald-500 font-medium text-emerald-50"
                   placeholder="E.g. Extra Olive Oil"
                 />
               </div>
               <div>
                 <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 block">Category</label>
                 <select 
                   value={newItemCat}
                   onChange={e => setNewItemCat(e.target.value)}
                   className="w-full bg-emerald-950/50 border border-emerald-700/50 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 font-medium text-emerald-50 appearance-none"
                 >
                   {CATEGORIES.map(c => <option key={c} value={c} className="bg-emerald-900">{c}</option>)}
                 </select>
               </div>
               <button type="submit" className="w-full py-3.5 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors shadow-sm shadow-emerald-500/20 mt-2">
                 Add to List
               </button>
             </form>
           </div>

           <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]">
             <h3 className="font-bold text-slate-900 text-lg mb-6">List Summary</h3>
             <div className="space-y-4 text-sm font-medium">
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                 <span className="text-slate-500">Auto Generated Items</span>
                 <span className="text-slate-900 font-bold">{baseItems.length}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                 <span className="text-slate-500">Custom Added Items</span>
                 <span className="text-blue-600 font-bold">{customItems.length}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                 <span className="text-slate-500">Items Left</span>
                 <span className="text-orange-500 font-bold">{remainingCount}</span>
               </div>
               <div className="flex justify-between items-center py-2 pt-4">
                 <span className="text-slate-800 font-bold text-lg">Total Items</span>
                 <span className="text-emerald-600 font-bold text-xl">{totalItems}</span>
               </div>
             </div>
           </div>

        </div>

      </div>
    </div>
  );
}

function CategoryIcon({ cat }) {
  if (cat === 'Produce') return <Apple className="w-5 h-5 text-red-500" />;
  if (cat === 'Protein') return <Beef className="w-5 h-5 text-rose-500" />;
  if (cat === 'Dairy') return <Droplet className="w-5 h-5 text-blue-500" />;
  if (cat === 'Pantry') return <Package className="w-5 h-5 text-amber-500" />;
  if (cat === 'Snacks') return <Cookie className="w-5 h-5 text-orange-500" />;
  return <ShoppingCart className="w-5 h-5 text-slate-400" />;
}
