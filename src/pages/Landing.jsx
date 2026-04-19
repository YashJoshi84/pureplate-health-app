import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ScanLine, CalendarDays, ShoppingCart, ShieldCheck, Star, PlayCircle } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-pure font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
         <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
               <ShieldCheck className="text-white w-5 h-5" />
             </div>
             <span className="text-2xl font-bold tracking-tight text-slate-900">PurePlate</span>
           </div>
           
           <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
             <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
             <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</a>
             <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
           </div>

           <div className="flex items-center gap-4">
             <Link to="/login" className="hidden md:block text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Log In</Link>
             <Link to="/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-sm hover:shadow-md">Get Started</Link>
           </div>
         </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              PurePlate v1.0 is live
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Plan Less. <br/> <span className="text-emerald-600">Eat Cleaner.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-8 leading-relaxed max-w-lg">
              Meal planning, grocery generation, and food label intelligence in one premium platform. Stop guessing what's healthy.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white rounded-full font-medium text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5 text-slate-400" /> Watch Demo
              </button>
            </div>
          </div>
          
          {/* Dashboard Mockup UI */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-teal-50 rounded-[40px] transform rotate-3 scale-105 opacity-50"></div>
            <div className="relative bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 md:p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Mockup Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900">Good Morning, Yash</h3>
                  <p className="text-sm text-slate-500">Today's Nutrition Plan</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <ScanLine className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              
              {/* Mockup Meals */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">🥑</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Avocado Toast</h4>
                    <p className="text-sm text-slate-500">Breakfast &bull; 320 kcal</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 ring-1 ring-emerald-500/20 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">HEALTH SCORE: A</div>
                  <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center text-2xl">🥗</div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Quinoa Bowl</h4>
                    <p className="text-sm text-slate-500">Lunch &bull; 450 kcal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted By */}
      <section className="border-y border-slate-100 bg-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Powered by world-class datasets</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            <h2 className="text-xl font-bold text-slate-600">OpenFoodFacts</h2>
            <h2 className="text-xl font-bold text-slate-600">Spoonacular API</h2>
            <h2 className="text-xl font-bold text-slate-600">USDA Database</h2>
            <h2 className="text-xl font-bold text-slate-600">Stripe</h2>
          </div>
        </div>
      </section>

      {/* 4. Bento Feature Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Everything you need to eat clean.</h2>
            <p className="text-lg text-slate-500 max-w-2xl">We've combined the tools that normally take 3 different apps into one seamless, premium experience.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
            {/* Planner - Large Card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden group">
              <div className="relative z-10 w-full md:w-2/3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                  <CalendarDays className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Smart Meal Planner</h3>
                <p className="text-slate-500 leading-relaxed">Drag and drop meals onto your calendar. We instantly calculate your weekly macros and ensure you're hitting your health goals.</p>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-64 h-64 bg-emerald-50 rounded-full blur-3xl group-hover:bg-emerald-100 transition-colors duration-500"></div>
            </div>

            {/* Grocery - Tall Card */}
            <div className="col-span-1 bg-white rounded-[32px] p-8 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col">
               <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                 <ShoppingCart className="w-6 h-6 text-blue-600" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Grocery Auto-Gen</h3>
               <p className="text-slate-500 text-sm leading-relaxed mb-6">Your selected meals automatically convert into an aisle-sorted grocery checklist. Walk in, check off, walk out.</p>
               <div className="mt-auto space-y-2">
                 <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Produce (4)</div>
                 <div className="flex items-center gap-3 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Pantry (2)</div>
               </div>
            </div>

            {/* Analyzer - Standard Card */}
            <div className="col-span-1 bg-slate-900 rounded-[32px] p-8 md:p-10 shadow-lg relative overflow-hidden text-white flex flex-col">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                 <ScanLine className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Food Purity Analyzer</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Scan barcodes in the store to detect hidden seed oils, artificial dyes, and added sugars immediately.</p>
              <div className="mt-auto inline-flex items-center gap-2 self-start bg-rose-500/20 text-rose-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-rose-500/30">
                Red 40 Detected
              </div>
            </div>

            {/* Swaps - Wide Card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-8 md:p-12 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100">
               <div className="flex items-center gap-6 mb-6">
                 <div className="w-16 h-16 rounded-2xl bg-amber-50 flex flex-col items-center justify-center text-center border border-amber-200">
                   <span className="text-xs font-bold text-amber-500 uppercase">Score</span>
                   <span className="text-xl font-black text-amber-600">D</span>
                 </div>
                 <ArrowRight className="text-slate-300" />
                 <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex flex-col items-center justify-center text-center border border-emerald-200 shadow-sm shadow-emerald-500/20">
                   <span className="text-xs font-bold text-emerald-500 uppercase">Score</span>
                   <span className="text-xl font-black text-emerald-600">A</span>
                 </div>
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Healthier Product Swaps</h3>
               <p className="text-slate-500 leading-relaxed md:w-2/3">When a scanned product scores poorly, our AI immediately recommends a cleaner, less-processed alternative available at your local store.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-16">Three steps to a cleaner lifestyle.</h2>
           
           <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-slate-50 border-8 border-white flex items-center justify-center text-2xl font-bold text-slate-900 shadow-sm mb-6">1</div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Plan your week</h3>
                 <p className="text-slate-500">Pick from hundreds of whole-food recipes to build your perfect weekly menu.</p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-emerald-50 border-8 border-white flex items-center justify-center text-2xl font-bold text-emerald-600 shadow-sm mb-6 shadow-emerald-500/10">2</div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Scan & Swap</h3>
                 <p className="text-slate-500">Take your auto-generated list to the store. Scan packaged items to ensure they meet your standards.</p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-24 h-24 rounded-full bg-slate-50 border-8 border-white flex items-center justify-center text-2xl font-bold text-slate-900 shadow-sm mb-6">3</div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Eat Clean</h3>
                 <p className="text-slate-500">Cook with confidence knowing every ingredient in your pantry is actively fueling your body.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12 text-center">Loved by health-conscious eaters.</h2>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <div className="flex text-amber-400 mb-4"><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/></div>
               <p className="text-lg text-slate-700 font-medium mb-6">"This app entirely changed how my family shops. The barcode scanner exposed so much hidden sugar in our 'healthy' snacks. The planner makes Sundays a breeze."</p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                 <div><p className="font-bold text-slate-900">Sarah Jenkins</p><p className="text-sm text-slate-500">Mother of 2</p></div>
               </div>
             </div>
             
             <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <div className="flex text-amber-400 mb-4"><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/><Star className="w-5 h-5" fill="currentColor"/></div>
               <p className="text-lg text-slate-700 font-medium mb-6">"As a personal trainer, I recommend PurePlate to all my clients. The visual UI is stunning, and having ingredient transparency right in your pocket is a superpower."</p>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                 <div><p className="font-bold text-slate-900">Marcus Wright</p><p className="text-sm text-slate-500">Fitness Coach</p></div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7 & 8. Pricing & Big CTA */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
           <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
           <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">Start taking control of what you eat today.</h2>
           <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
             Join thousands of people using PurePlate. Start your 14-day free trial on our Premium plan. No credit card required.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
             <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white rounded-full font-bold text-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/40">
               Start Free Trial
             </Link>
             <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors underline-offset-4 hover:underline">
               Or log in to your account
             </Link>
           </div>
           
           <p className="mt-10 text-sm text-slate-500">Basic features remain free forever. Premium is just $8/mo after trial.</p>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
             <ShieldCheck className="text-emerald-500 w-5 h-5" />
             <span className="text-xl font-bold tracking-tight text-slate-900">PurePlate</span>
           </div>
           <div className="text-sm text-slate-500">
             &copy; {new Date().getFullYear()} PurePlate Inc. All rights reserved.
           </div>
           <div className="flex gap-6 text-sm font-medium text-slate-500">
             <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
             <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
