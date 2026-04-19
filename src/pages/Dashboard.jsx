export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Good Morning, Yash</h1>
        <p className="text-slate-500 mt-1">Here is how we're fueling your body today.</p>
      </header>

      <div className="bg-emerald-500 p-8 rounded-3xl text-white shadow-lg shadow-emerald-500/20 relative overflow-hidden">
        <div className="relative z-10 w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-2">Wondering if it's healthy?</h2>
          <p className="text-emerald-50 mb-6">Scan any barcode or search for a product instantly.</p>
          <div className="flex bg-white rounded-full p-2">
            <input type="text" placeholder="Search Open Food api..." className="w-full px-4 text-slate-900 outline-none rounded-full" />
            <button className="bg-slate-900 px-6 py-2 rounded-full font-medium shadow-sm hover:bg-slate-800 transition">Scan</button>
          </div>
        </div>
      </div>
      
      <h2 className="text-lg font-bold text-slate-900 pt-4">Today's Meals</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[1,2,3].map(i => (
          <div key={i} className="aspect-square bg-white border border-slate-200 rounded-2xl flex items-center justify-center p-6 shadow-sm">
             <div className="text-slate-400 text-sm font-medium">Meal Slot {i} Empty</div>
          </div>
        ))}
      </div>
    </div>
  );
}
