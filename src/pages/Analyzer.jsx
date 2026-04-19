import { useState } from 'react';
import { Search, Loader2, Info, Leaf, ShieldAlert, CheckCircle, Scale, Droplet, Cookie, AlertTriangle } from 'lucide-react';

// Demo Database
const MOCK_DB = [
  {
    id: 1,
    name: "Nutella",
    brand: "Ferrero",
    score: "E",
    sugars: 56.3, // g per 100g
    fat: 30.9,
    sodium: 42,   // mg
    palmOil: true,
    preservatives: "High",
    unhealthyReason: "Extremely high sugar content (over 50%) and heavily relies on processed palm oil which is inflammatory and ecologically taxing.",
    alternatives: ["Artisan Hazelnut Butter", "Justin's Chocolate Hazelnut", "Homemade Cocoa Paste"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  {
    id: 2,
    name: "Maggi",
    brand: "Nestlé",
    score: "D",
    sugars: 1.2,
    fat: 14.4,
    sodium: 1140, // mg
    palmOil: true,
    preservatives: "High",
    unhealthyReason: "Massively high sodium content which spikes blood pressure, paired with refined wheat flour and flavor enhancers like MSG.",
    alternatives: ["Whole Wheat Hakka Noodles", "Brown Rice Vermicelli", "Zucchini Noodles"],
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: 3,
    name: "Lay's",
    brand: "Frito-Lay",
    score: "D",
    sugars: 0.5,
    fat: 35.0,
    sodium: 520,
    palmOil: true,
    preservatives: "Medium",
    unhealthyReason: "Fried in low-grade inflammatory vegetable oils and heavily salted, leading to weight gain and water retention.",
    alternatives: ["Baked Sweet Potato Chips", "Air-Popped Popcorn", "Roasted Chickpeas"],
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  {
    id: 4,
    name: "Corn Flakes",
    brand: "Kellogg's",
    score: "C",
    sugars: 8.0,
    fat: 0.1,
    sodium: 700,
    palmOil: false,
    preservatives: "Low",
    unhealthyReason: "Highly processed, high glycemic index causing immediate blood sugar spikes, and heavily fortified with synthetic vitamins.",
    alternatives: ["Steel Cut Oats", "Unsweetened Muesli", "Greek Yogurt with Nuts"],
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  {
    id: 5,
    name: "Oreo",
    brand: "Nabisco",
    score: "E",
    sugars: 38.0,
    fat: 20.0,
    sodium: 380,
    palmOil: true,
    preservatives: "High",
    unhealthyReason: "Packed with high fructose corn syrup, artificial flavorings, and palm oil. Highly addictive and devoid of nutrition.",
    alternatives: ["Dark Chocolate (70%+)", "Almond Flour Cookies", "Simple Mills Sweet Thins"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  {
    id: 6,
    name: "Pepsi",
    brand: "PepsiCo",
    score: "E",
    sugars: 41.0,
    fat: 0.0,
    sodium: 10,
    palmOil: false,
    preservatives: "High",
    unhealthyReason: "Liquid sugar immediately spikes insulin. Contains phosphoric acid which leaches calcium from bones, and artificial caramel coloring.",
    alternatives: ["Sparkling Mineral Water", "Zevia Cola", "Kombucha"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  {
    id: 7,
    name: "Coca Cola",
    brand: "The Coca-Cola Company",
    score: "E",
    sugars: 10.6,
    fat: 0.0,
    sodium: 10,
    palmOil: false,
    preservatives: "High",
    unhealthyReason: "Massive sugar load without fiber. Artificial colorings and acidity disrupt gut microbiome and dental enamel.",
    alternatives: ["Lemon Sparkling Water", "Olipop", "Unsweetened Iced Tea"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  {
    id: 8,
    name: "KitKat",
    brand: "Nestlé",
    score: "E",
    sugars: 49.0,
    fat: 28.0,
    sodium: 110,
    palmOil: true,
    preservatives: "Medium",
    unhealthyReason: "High amount of refined sugars and inflammatory palm fat masquerading as a light chocolate snack.",
    alternatives: ["Hu Kitchen Chocolate", "Cacao Nibs", "Chocolate Covered Almonds"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  {
    id: 9,
    name: "Pringles",
    brand: "Kellogg's",
    score: "E",
    sugars: 1.0,
    fat: 33.0,
    sodium: 620,
    palmOil: true,
    preservatives: "High",
    unhealthyReason: "Dehydrated potato flakes deep fried in palm oil, mixed with maltodextrin and synthetic flavorings.",
    alternatives: ["Kale Chips", "Blue Corn Tortilla Chips", "Siete Grain Free Chips"],
    color: "bg-rose-500",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  {
    id: 10,
    name: "Red Bull",
    brand: "Red Bull GmbH",
    score: "F",
    sugars: 11.0,
    fat: 0.0,
    sodium: 40,
    palmOil: false,
    preservatives: "High",
    unhealthyReason: "Dangerous mix of synthetic caffeine, massive sugar load, and artificial colorings leading to heart palpitations and crashes.",
    alternatives: ["Black Coffee", "Matcha Green Tea", "Yerba Mate"],
    color: "bg-rose-600",
    bgColor: "bg-rose-100",
    borderColor: "border-rose-300"
  }
];

export default function Analyzer() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState(null);

  const searchFood = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(false);
    setResult(null);

    // Fake network delay for premium feel
    setTimeout(() => {
      const match = MOCK_DB.find(item => item.name.toLowerCase() === query.toLowerCase().trim());
      setResult(match || undefined); // undefined means "searched but nothing found"
      setHasSearched(true);
      setIsSearching(false);
    }, 800);
  };

  const getScoreColor = (score) => {
    const map = {
      'A': 'bg-emerald-500 text-white',
      'B': 'bg-lime-500 text-white',
      'C': 'bg-yellow-500 text-slate-900',
      'D': 'bg-orange-500 text-white',
      'E': 'bg-rose-500 text-white',
      'F': 'bg-rose-700 text-white',
    };
    return map[score] || 'bg-slate-200 text-slate-700';
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 md:px-8 animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className={`transition-all duration-700 ease-in-out ${result ? 'mb-12 text-left' : 'mb-10 text-center max-w-2xl mx-auto mt-12'}`}>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Purity Analyzer</h1>
        <p className="text-slate-500 text-lg mb-8">Type any packaged food to uncover hidden ingredients, exact macros, and healthier alternatives.</p>
        
        <form onSubmit={searchFood} className={`relative mx-auto flex items-center transition-all duration-700 ease-in-out ${result ? 'max-w-full' : 'max-w-xl'}`}>
          <Search className="absolute left-4 text-slate-400 w-6 h-6" />
          <input 
            type="text" 
            placeholder="E.g., Nutella, Oreo, Maggi..."
            className="w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-2xl shadow-[0_2px_15px_rgb(0,0,0,0.03)] focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-800 text-lg font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={isSearching || !query.trim()}
            className="absolute right-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center h-[calc(100%-1rem)]"
          >
            {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze'}
          </button>
        </form>
      </div>

      {/* Loading Skeletons */}
      {isSearching && (
        <div className="animate-pulse fade-in duration-300">
           <div className="h-8 w-48 bg-slate-200 rounded-lg mb-6"></div>
           <div className="grid lg:grid-cols-3 gap-8">
             <div className="h-96 bg-slate-100 rounded-3xl"></div>
             <div className="lg:col-span-2 h-96 bg-slate-100 rounded-3xl"></div>
           </div>
        </div>
      )}

      {/* Empty State / Not Found */}
      {hasSearched && !result && !isSearching && (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] animate-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto mt-8">
           <Info className="w-12 h-12 mx-auto text-slate-300 mb-4" />
           <h4 className="text-xl font-bold text-slate-900 mb-2">No product found in demo database</h4>
           <div className="text-slate-500">
             <p className="mb-4">This demo only supports the following items:</p>
             <div className="flex flex-wrap justify-center gap-2 px-6">
                {MOCK_DB.map(p => (
                  <span key={p.id} onClick={(e) => { setQuery(p.name); setTimeout(() => document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100); }} className="px-3 py-1 bg-slate-50 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 cursor-pointer rounded-full text-sm font-medium transition-colors">
                    {p.name}
                  </span>
                ))}
             </div>
           </div>
        </div>
      )}

      {/* Detailed Product Card */}
      {result && !isSearching && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Image / Core Info Column */}
            <div className="lg:col-span-1 space-y-6">
               <div className={`rounded-3xl border p-8 flex flex-col items-center text-center relative overflow-hidden bg-white shadow-sm ${result.borderColor}`}>
                 <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 pointer-events-none rounded-full ${result.color}`}></div>
                 
                 <div className="w-48 h-48 bg-slate-50/50 rounded-3xl mb-6 flex items-center justify-center border border-dashed border-slate-200">
                   <span className="text-6xl drop-shadow-md">🥫</span>
                 </div>

                 <h2 className="text-3xl font-bold text-slate-900 mb-1">{result.name}</h2>
                 <p className="text-slate-500 font-bold mb-6 tracking-wide uppercase text-sm">{result.brand}</p>
                 
                 <div className="w-full p-5 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100 shadow-inner">
                    <span className="font-bold text-slate-700 text-lg">Health Score</span>
                    <span className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl shadow-sm ${getScoreColor(result.score)}`}>
                      {result.score}
                    </span>
                 </div>
               </div>
               
               <div className="bg-emerald-900 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative border border-emerald-800">
                  <Leaf className="absolute -bottom-8 -right-8 w-40 h-40 text-emerald-800 opacity-40 pointer-events-none" />
                  <h3 className="font-bold text-xl mb-3 relative z-10 text-emerald-50">Better Swaps</h3>
                  <ul className="space-y-3 mb-6 relative z-10">
                    {result.alternatives.map((alt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span className="text-emerald-100 font-medium">{alt}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3.5 bg-white text-emerald-900 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors relative z-10 shadow-sm border border-transparent hover:border-emerald-200 cursor-pointer">
                    Add to Grocery List
                  </button>
               </div>
            </div>

            {/* Nutrition & Science Column */}
            <div className="lg:col-span-2 space-y-6">
               
               {/* Why it's unhealthy */}
               <div className={`p-8 rounded-3xl border-2 shadow-sm ${result.bgColor} ${result.borderColor}`}>
                 <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                   <ShieldAlert className={`w-6 h-6 ${result.color.replace('bg-', 'text-')}`} /> Why this scored a {result.score}
                 </h3>
                 <p className="text-slate-700 text-lg leading-relaxed font-semibold">
                   {result.unhealthyReason}
                 </p>
               </div>

               <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border-t-4 border-t-slate-800">
                 <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Scale className="w-6 h-6 text-slate-800" /> Nutritional Breakdown
                   </div>
                   <span className="text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Per 100g</span>
                 </h3>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <NutrientBox label="Sugars" value={result.sugars} unit="g" icon={<Cookie className="w-4 h-4 text-rose-500"/>} result={result} />
                   <NutrientBox label="Fat" value={result.fat} unit="g" icon={<Droplet className="w-4 h-4 text-amber-500"/>} result={result} />
                   <NutrientBox label="Sodium" value={result.sodium} unit="mg" icon={<Scale className="w-4 h-4 text-stone-500"/>} result={result} />
                   
                   {/* Special Preservatives Box */}
                   <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Additives</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">{result.preservatives}</span>
                      </div>
                   </div>
                 </div>

                 <div className="grid md:grid-cols-1 gap-4 mt-6 border-t border-slate-100 pt-6">
                   <div className={`p-5 rounded-2xl flex items-center gap-4 border ${result.palmOil ? 'bg-orange-50 border-orange-200 text-orange-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                      {result.palmOil ? <ShieldAlert className="w-8 h-8 text-orange-600 shrink-0"/> : <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0"/>}
                      <div>
                        <h4 className="font-bold text-lg mb-1">{result.palmOil ? 'Palm Oil Detected' : 'No Palm Oil'}</h4>
                        <p className="text-sm opacity-90 font-medium">
                          {result.palmOil ? 'This product contains palm oil derivatives, which are heavily processed and linked to massive environmental deforestation.' : 'This product is strictly free from palm oil and its processed derivatives.'}
                        </p>
                      </div>
                   </div>
                 </div>
               </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function NutrientBox({ label, value, unit, icon }) {
  let borderClass = "border-slate-100 bg-slate-50";
  
  if (label === 'Sugars' && value > 15) borderClass = "border-rose-200 bg-rose-50 text-rose-900";
  if (label === 'Sodium' && value > 400) borderClass = "border-orange-200 bg-orange-50 text-orange-900";
  if (label === 'Fat' && value > 20) borderClass = "border-amber-200 bg-amber-50 text-amber-900";

  return (
    <div className={`p-4 rounded-2xl border ${borderClass} flex flex-col justify-between transition-colors`}>
       <div className="flex items-center gap-2 mb-3 opacity-90">
         {icon}
         <span className={`text-xs font-bold uppercase tracking-wider ${borderClass.includes('text') ? 'opacity-80' : 'text-slate-500'}`}>{label}</span>
       </div>
       <div className="flex items-baseline gap-1">
         <span className={`text-3xl font-bold tracking-tight ${borderClass.includes('text') ? '' : 'text-slate-900'}`}>{Number(value).toFixed(1)}</span>
         <span className={`text-sm font-bold opacity-70`}>{unit}</span>
       </div>
    </div>
  )
}
