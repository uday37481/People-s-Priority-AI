import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Landmark, ArrowRight, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/atoms/Button.jsx';

const PublicLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Problem', href: '#problem' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Benefits', href: '#benefits' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-secondary hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-premium">
              <Landmark size={18} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none">People's Priorities</span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">Gov AI Portal</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              View Dashboard
            </Button>
            <Button size="sm" onClick={() => navigate('/login')}>
              Get Started <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-lg px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-base font-medium text-slate-700 hover:text-primary transition-colors py-1.5"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="border-t border-slate-100 pt-4 flex flex-col space-y-2">
              <Button variant="outline" size="md" className="w-full" onClick={() => navigate('/login')}>
                View Dashboard
              </Button>
              <Button size="md" className="w-full" onClick={() => navigate('/login')}>
                Get Started <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <Landmark size={16} className="stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-sm tracking-tight">People's Priorities</span>
            </Link>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              An intelligent multilingual constituency development platform linking citizens and MPs for data-driven planning.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">AI Key Features</a></li>
              <li><a href="#problem" className="hover:text-white transition-colors">Problem Statement</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Citizen Benefits</a></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest mb-4">Security & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Data Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Government GDPR Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest mb-4">Hackathon Submission</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed as a modern civic tech solution for national-level deployment.
            </p>
            <div className="mt-4 text-xs bg-slate-800 text-slate-300 p-3 rounded-xl border border-slate-700">
              ⚡ Status: Hackathon Ready
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} People's Priorities Portal. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Citizen Agreement</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
