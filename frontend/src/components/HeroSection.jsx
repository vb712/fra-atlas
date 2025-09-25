import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-teal-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Forest Rights Act Atlas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Empowering forest communities through transparent, data-driven claim
            management and real-time insights for forest rights across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/map"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Explore Interactive Map
            </Link>
            <Link
              to="/dashboard"
              className="bg-transparent hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white transition duration-300"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
