import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020c1b] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif text-white mb-6">Equity<span className="text-brand-gold">Freedom</span></h3>
            <p className="text-brand-light/60 max-w-sm">
              The premier liquidity solution for concentrated stock holders. We turn golden handcuffs into generational wealth through institutional tax-deferral strategies.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-brand-light/60">
              <li><a href="#" className="hover:text-brand-gold">Methodology</a></li>
              <li><a href="#" className="hover:text-brand-gold">Vintage Ladder</a></li>
              <li><a href="#" className="hover:text-brand-gold">Tax Calculator</a></li>
              <li><a href="#" className="hover:text-brand-gold">Client Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-brand-light/60">
              <li><a href="#" className="hover:text-brand-gold">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-gold">Terms of Use</a></li>
              <li><a href="#" className="hover:text-brand-gold">Form ADV</a></li>
              <li><a href="#" className="hover:text-brand-gold">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-xs text-brand-light/30 leading-relaxed text-justify">
          <p className="mb-4">
            IMPORTANT DISCLOSURE: This website is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities. 
            Any such offer will be made only by means of a confidential Private Placement Memorandum (PPM) to accredited investors.
          </p>
          <p className="mb-4">
            Past performance is not indicative of future results. Investments in Section 721 Exchange Funds involve significant risks, including lack of liquidity, 
            potential loss of principal, and tax risks. The fund is not liquid for at least seven years.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Equity Freedom Capital Partners, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;