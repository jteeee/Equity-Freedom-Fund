import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CalculatorInputs, TaxCalculation } from '../types';
import { RefreshCw, AlertCircle, TrendingUp, Info, Loader2, MapPin, DollarSign } from 'lucide-react';

// Simulated API Data Source for Top Marginal Capital Gains Tax Rates (Approximate 2024/2025)
const US_STATE_DATA: Record<string, { name: string, rate: number }> = {
  AL: { name: 'Alabama', rate: 5.0 },
  AK: { name: 'Alaska', rate: 0.0 },
  AZ: { name: 'Arizona', rate: 2.5 },
  AR: { name: 'Arkansas', rate: 4.4 },
  CA: { name: 'California', rate: 13.3 },
  CO: { name: 'Colorado', rate: 4.4 },
  CT: { name: 'Connecticut', rate: 6.99 },
  DE: { name: 'Delaware', rate: 6.6 },
  DC: { name: 'District of Columbia', rate: 8.95 },
  FL: { name: 'Florida', rate: 0.0 },
  GA: { name: 'Georgia', rate: 5.75 },
  HI: { name: 'Hawaii', rate: 7.25 },
  ID: { name: 'Idaho', rate: 5.8 },
  IL: { name: 'Illinois', rate: 4.95 },
  IN: { name: 'Indiana', rate: 3.23 },
  IA: { name: 'Iowa', rate: 6.0 },
  KS: { name: 'Kansas', rate: 5.7 },
  KY: { name: 'Kentucky', rate: 4.0 },
  LA: { name: 'Louisiana', rate: 4.25 },
  ME: { name: 'Maine', rate: 7.15 },
  MD: { name: 'Maryland', rate: 5.75 },
  MA: { name: 'Massachusetts', rate: 9.0 }, // Includes 4% surtax
  MI: { name: 'Michigan', rate: 4.25 },
  MN: { name: 'Minnesota', rate: 9.85 },
  MS: { name: 'Mississippi', rate: 5.0 },
  MO: { name: 'Missouri', rate: 5.4 },
  MT: { name: 'Montana', rate: 6.75 },
  NE: { name: 'Nebraska', rate: 5.84 },
  NV: { name: 'Nevada', rate: 0.0 },
  NH: { name: 'New Hampshire', rate: 0.0 },
  NJ: { name: 'New Jersey', rate: 10.75 },
  NM: { name: 'New Mexico', rate: 5.9 },
  NY: { name: 'New York', rate: 10.9 },
  NC: { name: 'North Carolina', rate: 4.5 },
  ND: { name: 'North Dakota', rate: 2.9 },
  OH: { name: 'Ohio', rate: 3.5 },
  OK: { name: 'Oklahoma', rate: 4.75 },
  OR: { name: 'Oregon', rate: 9.9 },
  PA: { name: 'Pennsylvania', rate: 3.07 },
  RI: { name: 'Rhode Island', rate: 5.99 },
  SC: { name: 'South Carolina', rate: 6.4 },
  SD: { name: 'South Dakota', rate: 0.0 },
  TN: { name: 'Tennessee', rate: 0.0 },
  TX: { name: 'Texas', rate: 0.0 },
  UT: { name: 'Utah', rate: 4.65 },
  VT: { name: 'Vermont', rate: 8.75 },
  VA: { name: 'Virginia', rate: 5.75 },
  WA: { name: 'Washington', rate: 7.0 }, // Cap gains tax
  WV: { name: 'West Virginia', rate: 6.5 },
  WI: { name: 'Wisconsin', rate: 7.65 },
  WY: { name: 'Wyoming', rate: 0.0 },
};

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ticker: 'NVDA',
    stockValue: 5000000,
    costBasis: 500000,
    stateTaxRate: 13.3,
    holdingPeriod: 7,
  });

  const [selectedStateCode, setSelectedStateCode] = useState<string>('CA');
  const [isFetchingRates, setIsFetchingRates] = useState(false);
  
  const [results, setResults] = useState<TaxCalculation>({
    federalTax: 0,
    niitTax: 0,
    stateTax: 0,
    totalTax: 0,
    netAfterSale: 0,
    valueInFund: 0,
    wealthLost: 0,
  });

  // Simulated API fetch for tax rates
  const fetchTaxRate = async (stateCode: string) => {
    setIsFetchingRates(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const rate = US_STATE_DATA[stateCode]?.rate || 0;
    setInputs(prev => ({ ...prev, stateTaxRate: rate }));
    setIsFetchingRates(false);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedStateCode(code);
    fetchTaxRate(code);
  };

  useEffect(() => {
    // Ensure cost basis doesn't exceed stock value when stock value decreases
    if (inputs.costBasis > inputs.stockValue) {
        setInputs(prev => ({ ...prev, costBasis: inputs.stockValue }));
    }
  }, [inputs.stockValue]);

  useEffect(() => {
    const gain = inputs.stockValue - inputs.costBasis;
    const federalTax = gain * 0.20;
    const niitTax = gain * 0.038;
    const stateTax = gain * (inputs.stateTaxRate / 100);
    const totalTax = federalTax + niitTax + stateTax;
    
    // Future Value Calculation
    const annualGrowth = 0.07; // Conservative 7% estimate
    const compoundingFactor = Math.pow(1 + annualGrowth, inputs.holdingPeriod);
    
    // Scenario A: Sell Now -> Pay Tax -> Invest Net Proceeds
    const netProceedsStart = inputs.stockValue - totalTax;
    const fvSell = netProceedsStart * compoundingFactor;

    // Scenario B: Exchange -> Defer Tax -> Invest Full Amount
    const fvFund = inputs.stockValue * compoundingFactor;

    // The Wealth Lost is the difference in Future Value
    // This represents the "Compounded Growth on the Deferred Tax Liability"
    const wealthLost = fvFund - fvSell;

    setResults({
      federalTax,
      niitTax,
      stateTax,
      totalTax,
      netAfterSale: fvSell,
      valueInFund: fvFund,
      wealthLost: wealthLost
    });
  }, [inputs]);

  const chartData = [
    {
      name: 'Sell & Reinvest',
      value: results.netAfterSale,
      lost: results.wealthLost,
    },
    {
      name: 'Exchange Fund',
      value: results.valueInFund,
      lost: 0,
    },
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  // Custom Tooltip Component for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-dark/95 backdrop-blur-md border border-brand-gold/50 p-4 rounded-lg shadow-2xl min-w-[240px]">
          <p className="text-white font-serif text-lg mb-3 border-b border-white/10 pb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            // Skip rendering the 'lost' bar part if value is 0 (for Exchange Fund)
            if (entry.dataKey === 'lost' && entry.value === 0) return null;
            
            const isLoss = entry.dataKey === 'lost';
            
            return (
              <div key={index} className="flex flex-col mb-3 last:mb-0">
                 <span className="text-xs text-brand-light/60 uppercase tracking-wider font-medium flex items-center gap-2">
                   <span className={`w-2 h-2 rounded-full ${isLoss ? 'bg-red-400' : (label === 'Exchange Fund' ? 'bg-brand-gold' : 'bg-slate-400')}`}></span>
                   {isLoss ? 'Opportunity Cost' : 'Projected Value'}
                 </span>
                 <span className={`text-xl font-mono font-bold mt-1 ${isLoss ? 'text-red-400' : 'text-white'}`}>
                   {formatCurrency(entry.value)}
                 </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="calculator" className="py-24 bg-brand-dark relative">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">The Cost of Selling</h2>
          <p className="text-brand-light/60 max-w-2xl mx-auto">
            Calculate the long-term wealth destruction caused by triggering capital gains taxes today versus deferring them.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 bg-brand-slate border border-white/5 rounded-2xl p-8 lg:p-12 shadow-2xl">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            <h3 className="text-2xl font-serif text-white mb-2">Configure Your Scenario</h3>

            {/* Ticker - Keep as compact input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-light/60 mb-2">Stock Ticker</label>
              <input 
                  type="text" 
                  value={inputs.ticker}
                  onChange={(e) => setInputs({...inputs, ticker: e.target.value.toUpperCase()})}
                  className="w-full bg-brand-dark border border-white/10 rounded-sm px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors font-mono"
                />
            </div>
            
            {/* Stock Value Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-light/60">Stock Value</label>
                  <div className="text-2xl font-mono font-bold text-brand-gold">{formatCurrency(inputs.stockValue)}</div>
              </div>
              <input 
                type="range" 
                min={100000} 
                max={10000000} 
                step={50000}
                value={inputs.stockValue}
                onChange={(e) => setInputs({...inputs, stockValue: Number(e.target.value)})}
                className="w-full h-2 bg-brand-dark border border-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-between text-xs text-brand-light/30 mt-2 font-mono">
                  <span>$100k</span>
                  <span>$10M</span>
              </div>
            </div>

            {/* Cost Basis Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-light/60">Cost Basis</label>
                  <div className="text-2xl font-mono font-bold text-white">{formatCurrency(inputs.costBasis)}</div>
              </div>
              <input 
                type="range" 
                min={0} 
                max={inputs.stockValue} 
                step={10000}
                value={inputs.costBasis}
                onChange={(e) => setInputs({...inputs, costBasis: Number(e.target.value)})}
                className="w-full h-2 bg-brand-dark border border-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
              />
              <div className="flex justify-end text-xs text-brand-light/60 mt-2 font-mono">
                  <span>Unrealized Gain: {formatCurrency(inputs.stockValue - inputs.costBasis)}</span>
              </div>
            </div>

            {/* Tax Variables Group */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2">
                <MapPin size={16} /> Tax & Location
              </h3>

              <div>
                <label className="block text-sm font-medium text-brand-light/80 mb-2">State of Residence</label>
                <div className="relative">
                    <select 
                        value={selectedStateCode}
                        onChange={handleStateChange}
                        className="w-full bg-brand-dark border border-white/10 rounded-sm px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                        {Object.entries(US_STATE_DATA).sort((a,b) => a[1].name.localeCompare(b[1].name)).map(([code, data]) => (
                            <option key={code} value={code}>{data.name}</option>
                        ))}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-light/40">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                
                {/* Real-time Rate Display */}
                <div className="flex justify-between items-center mt-2 px-1 h-6">
                    <span className="text-xs text-brand-light/40">Est. Capital Gains Rate</span>
                    {isFetchingRates ? (
                        <div className="flex items-center gap-2 text-xs text-brand-gold animate-pulse">
                            <Loader2 size={12} className="animate-spin" /> Fetching latest rates...
                        </div>
                    ) : (
                        <span className="text-xs font-mono text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                            {inputs.stateTaxRate.toFixed(2)}%
                        </span>
                    )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-brand-light/80">
                      Investment Horizon
                    </label>
                    <span className="text-xs text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                        {inputs.holdingPeriod} Years
                    </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  value={inputs.holdingPeriod}
                  onChange={(e) => setInputs({...inputs, holdingPeriod: Number(e.target.value)})}
                  className="w-full h-2 bg-brand-dark border border-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                />
                <div className="flex justify-between text-xs text-brand-light/40 mt-1">
                  <span>1 Year</span>
                  <span className="flex items-center gap-1 text-brand-gold/60">
                    <TrendingUp size={10} /> 
                    Assumed Growth: 7%
                  </span>
                  <span>30 Years</span>
                </div>
              </div>

              <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-sm mt-4">
                  <div className="flex items-center gap-2 text-red-400 mb-1">
                      <AlertCircle size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">Immediate Liability</span>
                  </div>
                  <div className="text-2xl font-mono text-white">
                      {formatCurrency(results.totalTax)}
                  </div>
                  <div className="text-xs text-red-300/60 mt-1">Payable to IRS/State in April</div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="h-80 w-full mb-8 relative">
                {/* Chart Background Accent */}
                <div className="absolute inset-0 border-l border-b border-white/5 pointer-events-none"></div>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }} layout="vertical">
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#fcd34d" />
                    </linearGradient>
                    <linearGradient id="slateGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                    <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                         <rect width="8" height="8" fill="#1e293b" opacity="0.5" />
                         <line x1="0" y1="0" x2="0" y2="10" style={{stroke:'#ef4444', strokeWidth:2, opacity: 0.8}} />
                    </pattern>
                  </defs>
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={130} 
                    tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500, fontFamily: '"Inter", sans-serif'}} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.03)'}} />
                  <Bar dataKey="value" stackId="a" radius={[0, 0, 0, 0]} barSize={56}>
                     {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? 'url(#slateGradient)' : 'url(#goldGradient)'} />
                     ))}
                  </Bar>
                  <Bar dataKey="lost" stackId="a" fill="url(#diagonalHatch)" radius={[0, 4, 4, 0]} barSize={56} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-dark p-6 rounded-sm border border-white/5">
                    <div className="text-sm text-brand-light/60 mb-2">Sell Strategy (Year {inputs.holdingPeriod})</div>
                    <div className="text-2xl font-bold text-white mb-1">{formatCurrency(results.netAfterSale)}</div>
                    <div className="flex flex-col mt-2">
                        <div className="flex items-center gap-2">
                            <DollarSign size={14} className="text-red-400" />
                            <span className="text-xs text-red-400 font-medium">
                                {formatCurrency(results.wealthLost)} Opportunity Cost
                            </span>
                        </div>
                        <span className="text-[10px] text-red-400/60 pl-6 mt-1">
                            (Tax + 7% Annual Growth Loss)
                        </span>
                    </div>
                </div>
                <div className="bg-brand-gold/10 p-6 rounded-sm border border-brand-gold/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20"><RefreshCw className="text-brand-gold w-8 h-8" /></div>
                    <div className="text-sm text-brand-gold mb-2">Exchange Strategy (Year {inputs.holdingPeriod})</div>
                    <div className="text-2xl font-bold text-white mb-1">{formatCurrency(results.valueInFund)}</div>
                    <div className="text-xs text-brand-gold">100% Tax Deferral & Growth</div>
                </div>
            </div>

            {/* Opportunity Cost Explanation */}
            <div className="mt-6 p-4 bg-red-900/10 border-l-2 border-red-400/50 rounded-r-sm">
                <h4 className="text-sm font-bold text-red-400 mb-1 flex items-center gap-2">
                   <TrendingUp size={14} /> The Cost of Selling First
                </h4>
                <p className="text-xs text-brand-light/70 leading-relaxed">
                    The <span className="text-red-300 font-medium">Opportunity Cost</span> isn't just the tax bill itself—it is the lost potential of that capital. 
                    By paying <strong>{formatCurrency(results.totalTax)}</strong> in taxes today, you lose out on <strong>{inputs.holdingPeriod} years</strong> of compound growth on that money. 
                    The Exchange Fund keeps that capital working for you.
                </p>
            </div>
            
            {/* Disclaimer Section */}
            <div className="mt-8 bg-brand-dark/50 border border-white/5 rounded p-4 flex gap-3">
                <Info className="w-5 h-5 text-brand-light/40 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-brand-light/40 leading-relaxed space-y-2">
                    <p>
                        <strong className="text-brand-light/60">Tax Data Disclaimer:</strong> Tax rates shown are estimates based on top marginal state capital gains brackets for the 2024/2025 tax year.
                        Actual liability depends on filing status, deductions, and total income.
                    </p>
                    <p>
                        *Washington state applies a 7% tax on capital gains exceeding $250,000. Massachusetts applies a 4% surtax on income over $1M.
                        Calculations assume a hypothetical 7% annual compounded growth rate. This tool is for illustrative purposes only and does not constitute professional tax advice.
                    </p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Calculator;