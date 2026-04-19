import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-16 md:mt-24 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
        Plan Less. <span className="text-emerald-600">Eat Cleaner.</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        The ultimate platform that plans your weekly meals, builds your grocery list, and protects you from hidden, toxic ingredients.
      </p>
      <Link to="/signup" className="px-8 py-4 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/25 md:text-lg">
        Start Your Free Trial
      </Link>
    </div>
  );
}
