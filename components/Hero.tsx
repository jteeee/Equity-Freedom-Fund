import React from 'react';
import { ArrowRight, Lock, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#020c1b]">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-slate via-[#020c1b] to-[#020c1b]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/5">
            <Lock className="w-3 h-3 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold"> Accredited Investors Only</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-serif font-medium text-white leading-tight">
            Turn Concentrated Stock into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Diversified Wealth.</span>
          </h1>
          
          <p className="text-xl text-brand-light/70 font-light leading-relaxed max-w-lg">
            The institutional tax-deferral strategy for Apple, NVIDIA, and Google executives—now accessible to you. Zero tax event. Institutional yield.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#calculator" className="bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-bold py-4 px-8 rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Calculate Tax Savings
            </a>
            <a href="#how-it-works" className="border border-brand-light/20 hover:border-brand-gold text-brand-light hover:text-brand-gold py-4 px-8 rounded-sm transition-all flex items-center justify-center">
              View Strategy
            </a>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="bg-brand-slate/50 backdrop-blur-xl border border-white/5 rounded-xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-transparent"></div>
            
            <h3 className="text-white font-serif text-2xl mb-6">The Wealth Gap</h3>
            
            <div className="space-y-6">
              {/* Scenario A */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-brand-light/60">
                  <span>Traditional Sale</span>
                  <span className="text-red-400">IMMEDIATE 35% LOSS</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-red-500/50"></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-brand-light/40">
                  <span>$5M Position</span>
                  <span>$3.25M Net</span>
                </div>
              </div>

              {/* Scenario B */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-brand-light/60">
                  <span className="text-brand-gold font-bold">Exchange Fund (721)</span>
                  <span className="text-brand-gold">100% WORKING CAPITAL</span>
                </div>
                <div className="h-4 bg-white/5 rounded-full overflow-hidden relative">
                  <div className="h-full w-full bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-brand-light/40">
                  <span>$5M Position</span>
                  <span className="text-brand-gold">$5M Invested</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-4">
              <div className="p-3 bg-brand-gold/10 rounded-full">
                <TrendingUp className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <h4 className="text-white font-medium">Compound Effect</h4>
                <p className="text-sm text-brand-light/60 mt-1">
                  Investing the tax savings ($1.75M) over 7 years creates exponential difference in outcome.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;