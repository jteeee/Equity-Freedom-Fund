import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-brand-gold" />
          <span className="text-xl font-serif font-bold text-white tracking-wide">
            Equity<span className="text-brand-gold">Freedom</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-brand-light/80 hover:text-brand-gold transition-colors">Methodology</a>
          <a href="#vintage-ladder" className="text-sm font-medium text-brand-light/80 hover:text-brand-gold transition-colors">The Ladder</a>
          <a href="#calculator" className="text-sm font-medium text-brand-light/80 hover:text-brand-gold transition-colors">Tax Calculator</a>
          
          <button className="bg-brand-gold hover:bg-brand-goldHover text-brand-dark font-semibold py-2 px-6 rounded-sm transition-all flex items-center gap-2">
            Request Access <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-t border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-brand-light hover:text-brand-gold">Methodology</a>
          <a href="#vintage-ladder" onClick={() => setIsOpen(false)} className="text-brand-light hover:text-brand-gold">The Ladder</a>
          <a href="#calculator" onClick={() => setIsOpen(false)} className="text-brand-light hover:text-brand-gold">Tax Calculator</a>
          <button className="bg-brand-gold text-brand-dark font-bold py-3 w-full rounded-sm">
            Request Invitation
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;