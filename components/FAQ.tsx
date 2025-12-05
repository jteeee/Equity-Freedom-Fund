import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the tax deferral actually work?",
    answer: "Under IRC Section 721, contributing appreciated assets to a partnership in exchange for an interest in that partnership is generally a non-taxable event. You do not recognize capital gains upon contribution. You only recognize gains when you eventually redeem your interest in the diversified fund, allowing your pre-tax capital to compound for years."
  },
  {
    question: "What is the minimum holding period?",
    answer: "To comply with IRS 'mixing bowl' rules (Sections 704(c) and 737), investors must generally remain in the fund for a minimum of seven years. Early redemptions are restricted to protect the tax-free status of the entire partnership, though we provide liquidity via distributions during this period."
  },
  {
    question: "Who is eligible to invest in the fund?",
    answer: "This is a Regulation D, Rule 506(c) private placement. Participation is strictly limited to Accredited Investors as defined by the SEC. This typically requires an annual income of $200k+ ($300k+ joint) or a net worth exceeding $1M excluding your primary residence."
  },
  {
    question: "What happens to my stock after I contribute it?",
    answer: "Your stock is pooled with contributions from other investors (e.g., Apple, Microsoft, Amazon shares) to create a diversified, index-like portfolio. This eliminates your single-stock concentration risk immediately without triggering a tax bill."
  },
  {
    question: "What are the fees associated with the fund?",
    answer: "The fund charges a standard management fee (typically 1.5% - 2.0% annually) to cover administration, audit, and legal costs. A performance fee (carried interest) applies only to profits above a specific hurdle rate, ensuring our interests are aligned with yours."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-[100px]"></div>
        </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-light/10 bg-brand-light/5 mb-4">
             <HelpCircle size={14} className="text-brand-gold" />
             <span className="text-xs uppercase tracking-widest text-brand-light/60">Common Questions</span>
          </div>
          <h2 className="text-4xl font-serif text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-brand-light/60">Understanding the mechanics of the 721 Exchange.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
                <div 
                    key={index} 
                    className={`border transition-all duration-300 rounded-lg overflow-hidden ${
                        isOpen 
                        ? 'border-brand-gold/50 bg-brand-slate/50 shadow-[0_0_30px_rgba(212,175,55,0.05)]' 
                        : 'border-white/5 bg-brand-slate/20 hover:border-white/10 hover:bg-brand-slate/30'
                    }`}
                >
                <button
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => toggle(index)}
                >
                    <span className={`font-serif text-lg transition-colors duration-300 ${isOpen ? 'text-brand-gold' : 'text-white'}`}>
                        {faq.question}
                    </span>
                    <div className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-brand-gold text-brand-dark rotate-180' : 'bg-white/5 text-brand-light/60'}`}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                </button>
                
                <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="overflow-hidden">
                        <div className="px-6 pb-6 text-brand-light/70 leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                        </div>
                    </div>
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
