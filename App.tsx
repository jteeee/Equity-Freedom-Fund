import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#020c1b] text-brand-light font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />
      <Hero />
      <Calculator />
      <HowItWorks />
      <FAQ />
      
      {/* Lead Gen / Request Access Section */}
      <section className="py-24 bg-brand-gold text-brand-dark">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Private Access Only</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto font-medium opacity-90">
            Due to Regulation D restrictions, our Vintage 2025 fund is limited to 99 qualified investors. Secure your allocation today.
          </p>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg border border-brand-dark/10 shadow-2xl">
             <form className="grid gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-sm bg-white border border-transparent focus:border-brand-dark focus:outline-none" />
                <input type="email" placeholder="Corporate Email" className="w-full px-4 py-3 rounded-sm bg-white border border-transparent focus:border-brand-dark focus:outline-none" />
                <div className="flex items-center gap-2 text-sm justify-center py-2">
                    <input type="checkbox" id="accredited" className="w-4 h-4 accent-brand-dark" />
                    <label htmlFor="accredited">I certify I am an Accredited Investor</label>
                </div>
                <button className="w-full bg-brand-dark text-brand-gold font-bold py-4 rounded-sm hover:bg-gray-900 transition-colors">
                    Request Offering Memorandum
                </button>
             </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;