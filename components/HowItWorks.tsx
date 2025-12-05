import React, { useState } from 'react';
import { Users, PieChart, Landmark, ArrowRight, RefreshCw, Clock, Layers } from 'lucide-react';

const Step = ({ icon, title, desc, num }: { icon: React.ReactNode, title: string, desc: string, num: string }) => (
  <div className="relative p-6 bg-brand-slate border border-white/5 hover:border-brand-gold/30 transition-all group rounded-xl">
    <div className="absolute -top-4 -left-4 w-10 h-10 bg-brand-gold text-brand-dark font-bold flex items-center justify-center rounded-full shadow-lg z-10">
      {num}
    </div>
    <div className="mb-4 text-brand-light/80 group-hover:text-brand-gold transition-colors">{icon}</div>
    <h3 className="text-xl font-serif text-white mb-2">{title}</h3>
    <p className="text-sm text-brand-light/60 leading-relaxed">{desc}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  const [ladderDepth, setLadderDepth] = useState(3);
  const contributionPerVintage = 1000000; // $1M per year example

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="how-it-works" className="py-24 bg-[#020c1b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif text-white mb-4">The 721 Mechanism</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent -translate-y-1/2 z-0"></div>

          <div className="relative z-10">
              <Step 
                num="01"
                icon={<Users size={32} />}
                title="Contribution"
                desc="Investors contribute shares 'in-kind' (e.g., AAPL, GOOGL) to the Limited Partnership. No sale occurs. No tax is triggered per IRC Section 721."
              />
          </div>

          <div className="relative z-10">
              <Step 
                num="02"
                icon={<PieChart size={32} />}
                title="Pooling & Diversification"
                desc="The fund pools contributions to create a diversified index-like portfolio (80%). Simultaneously, 20% is allocated to private credit for income."
              />
          </div>

          <div className="relative z-10">
              <Step 
                num="03"
                icon={<Landmark size={32} />}
                title="Tax-Deferred Exit"
                desc="After the 7-year regulatory holding period, you receive a diversified basket of securities. You choose when to sell and realize gains."
              />
          </div>
        </div>

        {/* Vintage Strategy */}
        <div id="vintage-ladder" className="mt-32">
            <div className="bg-brand-slate border border-brand-gold/20 rounded-2xl p-8 lg:p-12 overflow-hidden relative shadow-2xl">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                {/* Header & Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 relative z-10">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                           <Layers className="text-brand-gold" size={24} />
                           <h3 className="text-3xl font-serif text-white">The Vintage Ladder Strategy</h3>
                        </div>
                        <p className="text-brand-light/70 leading-relaxed">
                            Don't just solve for today. Solve for perpetuity. By stacking multiple annual vintages, you create a <strong>rolling liquidity machine</strong> that unlocks a tax-deferred payout every single year starting in Year 8.
                        </p>
                    </div>

                    {/* Interactive Slider Control */}
                    <div className="bg-brand-dark/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 w-full lg:w-auto min-w-[320px] shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Vintages to Stack</span>
                            <span className="text-xl font-mono text-white font-bold">{ladderDepth} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={ladderDepth}
                            onChange={(e) => setLadderDepth(Number(e.target.value))}
                            className="w-full h-2 bg-brand-slate border border-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold mb-3"
                        />
                        <div className="flex justify-between text-[10px] text-brand-light/40 uppercase font-medium">
                            <span>Single Vintage</span>
                            <span>Perpetual Ladder</span>
                        </div>
                    </div>
                </div>

                {/* Interactive Visualization */}
                <div className="relative z-10 space-y-3 bg-brand-dark/30 p-6 rounded-xl border border-white/5">
                    {/* Headers */}
                    <div className="grid grid-cols-12 gap-4 text-xs font-bold text-brand-light/30 uppercase tracking-widest mb-2 px-2">
                        <div className="col-span-3">Contribution (In)</div>
                        <div className="col-span-6 text-center">7-Year Compounding Bridge</div>
                        <div className="col-span-3 text-right">Liquidity (Out)</div>
                    </div>

                    {/* Dynamic Rows */}
                    {Array.from({ length: ladderDepth }).map((_, i) => {
                        const startYear = 2025 + i;
                        const endYear = startYear + 7;
                        
                        return (
                            <div key={i} className="grid grid-cols-12 gap-4 items-center h-16 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors rounded-lg px-2 group">
                                {/* Left: Input */}
                                <div className="col-span-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-brand-gold/50"></div>
                                        <div>
                                            <div className="text-white font-mono font-bold">{startYear}</div>
                                            <div className="text-xs text-brand-light/50">{formatCurrency(contributionPerVintage)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center: Bar */}
                                <div className="col-span-6 relative h-full flex items-center px-4">
                                    <div className="w-full h-2 bg-brand-dark rounded-full overflow-hidden relative border border-white/5">
                                        {/* Progress Bar */}
                                        <div 
                                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-slate via-brand-gold/50 to-brand-gold w-full opacity-80"
                                        ></div>
                                        
                                        {/* Animated Shine */}
                                        <div className="absolute top-0 left-0 h-full w-20 bg-white/20 blur-md -skew-x-12 animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark border border-brand-gold/20 px-3 py-1 rounded-full">
                                        <span className="text-[10px] text-brand-gold font-medium flex items-center gap-1">
                                            <Clock size={10} /> 7 Years
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Output */}
                                <div className="col-span-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <div>
                                            <div className="text-brand-gold font-mono font-bold group-hover:scale-110 transition-transform">{endYear}</div>
                                            <div className="text-xs text-brand-gold/60">Unlock</div>
                                        </div>
                                        <ArrowRight size={14} className="text-brand-gold/50" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Metrics */}
                <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-brand-dark p-4 rounded-lg border border-white/5">
                        <div className="text-xs text-brand-light/40 uppercase tracking-wider mb-1">Total Pipeline Value</div>
                        <div className="text-2xl text-white font-mono font-bold">{formatCurrency(ladderDepth * contributionPerVintage)}</div>
                    </div>
                    <div className="bg-brand-dark p-4 rounded-lg border border-white/5">
                        <div className="text-xs text-brand-light/40 uppercase tracking-wider mb-1">Pipeline Duration</div>
                        <div className="text-2xl text-white font-mono flex items-baseline gap-2">
                             <span>{2025}</span>
                             <span className="text-xs text-brand-light/30">to</span>
                             <span>{2025 + ladderDepth + 7}</span>
                        </div>
                    </div>
                     <div className="bg-brand-gold/10 p-4 rounded-lg border border-brand-gold/20">
                        <div className="text-xs text-brand-gold/60 uppercase tracking-wider mb-1">Annual Liquidity Starts</div>
                        <div className="text-2xl text-brand-gold font-mono font-bold flex items-center gap-2">
                           <RefreshCw size={20} className="animate-spin-slow" />
                           {2032}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;