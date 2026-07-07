import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Landmark, LayoutDashboard, FilePlus2, BarChart3, 
  Settings, LogOut, Bell, Search, User, Menu, X, CheckSquare 
} from 'lucide-react';
import Button from '../components/atoms/Button.jsx';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Determine user role based on pathname
  const isMP = location.pathname.startsWith('/mp');
  const roleTitle = isMP ? 'MP Planner' : 'Citizen Profile';
  const roleName = isMP ? 'Hon. Rajesh Kumar' : 'Arjun Sharma';
  const constituency = 'North-West Constituency';

  const citizenLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'File Complaint', path: '/dashboard/submit', icon: <FilePlus2 size={18} /> }
  ];

  const mpLinks = [
    { name: 'MP Overview', path: '/mp', icon: <LayoutDashboard size={18} /> },
    { name: 'Advanced Analytics', path: '/mp/analytics', icon: <BarChart3 size={18} /> }
  ];

  const activeLinks = isMP ? mpLinks : citizenLinks;

  const mockNotifications = [
    { id: 1, title: 'AI Status Update', desc: 'Your road complaint #2401 summarized by Gemini.', time: '10m ago', unread: true },
    { id: 2, title: 'Project Scheduled', desc: 'Drainage repair in Ward 7 approved by MP.', time: '2h ago', unread: true },
    { id: 3, title: 'Verification Requested', desc: 'Please confirm resolution for streetlight case.', time: '1d ago', unread: false }
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans text-secondary antialiased select-none">
      
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 p-6 justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 text-white hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-premium">
              <Landmark size={18} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none">People's Priorities</span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Gov AI Portal</span>
            </div>
          </Link>

          {/* User Mini Profile */}
          <div className="bg-slate-950/40 rounded-xl border border-slate-800/80 p-3.5 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-primary-light font-bold border border-slate-700">
              {roleName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-xs font-bold text-white truncate leading-snug">{roleName}</span>
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{roleTitle}</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-2">Navigation</span>
            {activeLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-large text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/10' 
                      : 'hover:bg-slate-800/50 hover:text-white text-slate-400'
                    }
                  `}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Controls */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="px-3">
            <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">{constituency}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-large text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* TOP NAVBAR */}
        <header className="h-16 border-b border-slate-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
          
          {/* Left search bar / mobile logo */}
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-950 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search complaints, wards, topics..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200/80 dark:border-slate-800 rounded-large bg-slate-50/50 text-xs placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white"
              />
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center space-x-3">
            {/* Notification Badge Trigger */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger animate-pulse" />
              </button>

              {/* Notification Slideout Panel */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-slate-900 rounded-large border border-slate-200/60 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-4"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">Recent Updates</span>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">3 Unread</span>
                      </div>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto">
                        {mockNotifications.map(notif => (
                          <div key={notif.id} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 dark:text-white">{notif.title}</span>
                              <span className="text-[9px] text-slate-400">{notif.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{notif.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Switch role helper (Useful for hackathon demo!) */}
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => navigate(isMP ? '/dashboard' : '/mp')}
              className="text-[11px] py-1 px-3 border-dashed hover:border-solid"
            >
              Demo: Switch to {isMP ? 'Citizen' : 'MP'}
            </Button>
          </div>
        </header>

        {/* MAIN BODY AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* MOBILE BOTTOM NAVIGATION BAR */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 px-6 flex items-center justify-around z-30 shadow-lg">
          {activeLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex flex-col items-center justify-center space-y-1 text-slate-400 hover:text-primary transition-colors
                  ${isActive ? 'text-primary' : ''}
                `}
              >
                {link.icon}
                <span className="text-[10px] font-bold tracking-wider">{link.name.split(' ')[0]}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center space-y-1 text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-[10px] font-bold tracking-wider">Exit</span>
          </button>
        </nav>
      </div>

      {/* 3. MOBILE SIDEBAR DRAWER OVERLAY */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between border-r border-slate-800 lg:hidden"
            >
              <div className="space-y-8">
                {/* Logo and close button */}
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-2 text-white">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                      <Landmark size={16} className="stroke-[2.5]" />
                    </div>
                    <span className="font-extrabold text-sm tracking-tight">People's Priorities</span>
                  </Link>
                  <button 
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Profile */}
                <div className="bg-slate-950/40 rounded-xl border border-slate-800/80 p-3.5 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-primary-light font-bold">
                    {roleName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white leading-tight">{roleName}</span>
                    <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">{roleTitle}</span>
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="space-y-1.5">
                  <span className="block text-[9px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-1">Navigation</span>
                  {activeLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-large text-sm font-medium transition-colors
                          ${isActive 
                            ? 'bg-primary text-white' 
                            : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                          }
                        `}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <span className="block text-[10px] font-bold text-slate-600 uppercase px-3">{constituency}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-large text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DashboardLayout;
