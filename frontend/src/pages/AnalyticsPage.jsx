import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, Calendar, Layers, MapPin, AlertCircle, 
  Download, Sparkles, RefreshCw, BarChart3, TrendingUp,
  TrendingDown, CheckCircle2, ChevronRight, FileSpreadsheet, FileText
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Card from '../components/atoms/Card.jsx';
import Button from '../components/atoms/Button.jsx';

const AnalyticsPage = () => {
  // Filter States
  const [dateRange, setDateRange] = useState('30days');
  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [ward, setWard] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(true);

  // Active filter helper display
  const [activeFilters, setActiveFilters] = useState({
    dateRange: 'Last 30 Days',
    category: 'All Categories',
    priority: 'All Priorities',
    ward: 'All Wards'
  });

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setFiltersApplied(false);
    setTimeout(() => {
      setFiltersApplied(true);
      setActiveFilters({
        dateRange: dateRange === '30days' ? 'Last 30 Days' : dateRange === '90days' ? 'Last 90 Days' : 'Year to Date',
        category: category === 'all' ? 'All Categories' : category,
        priority: priority === 'all' ? 'All Priorities' : priority,
        ward: ward === 'all' ? 'All Wards' : `Ward ${ward}`
      });
    }, 800);
  };

  const handleResetFilters = () => {
    setDateRange('30days');
    setCategory('all');
    setPriority('all');
    setWard('all');
    setActiveFilters({
      dateRange: 'Last 30 Days',
      category: 'All Categories',
      priority: 'All Priorities',
      ward: 'All Wards'
    });
  };

  const handleExport = (format) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  // Top locations data sorted by density
  const topLocations = [
    { name: "Ward 7 (Kanjhawala)", count: 243, pct: 100, color: "bg-danger" },
    { name: "Ward 5 (Rohini Sector B)", count: 112, pct: 60, color: "bg-orange-500" },
    { name: "Ward 3 (Sultanpuri)", count: 88, pct: 45, color: "bg-warning" },
    { name: "Ward 1 (Narela Gate)", count: 32, pct: 20, color: "bg-primary" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-16">
        
        {/* HEADER & EXPORT ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-secondary">Advanced Constituency Analytics</h2>
            <p className="text-xs text-slate-400 mt-1">Cross-reference citizen concerns, growth rates, and mapping hotspots.</p>
          </div>

          <div className="flex items-center space-x-2.5 relative">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleExport('csv')} 
              disabled={isExporting}
            >
              <FileSpreadsheet size={14} className="mr-1.5 text-emerald-600" /> Export CSV
            </Button>
            <Button 
              size="sm" 
              onClick={() => handleExport('pdf')} 
              disabled={isExporting}
            >
              <Download size={14} className="mr-1.5" /> Export PDF Report
            </Button>

            {/* Export success popover */}
            <AnimatePresence>
              {exportSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 bg-slate-900 text-white text-[11px] font-semibold px-3.5 py-2 rounded-xl shadow-xl z-35 flex items-center space-x-2 border border-slate-800"
                >
                  <CheckCircle2 size={12} className="text-success" />
                  <span>Report compiled & downloaded!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* INTERACTIVE FILTERS BAR */}
        <Card className="p-6 bg-white border border-slate-100 shadow-premium">
          <form onSubmit={handleApplyFilters} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Date Range Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <Calendar size={12} className="mr-1 text-primary" /> Date Range
              </label>
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="input-field py-2.5 text-xs bg-slate-50/50"
              >
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="ytd">Year to Date (2026)</option>
              </select>
            </div>

            {/* Category Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <Layers size={12} className="mr-1 text-accent" /> Category
              </label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="input-field py-2.5 text-xs bg-slate-50/50"
              >
                <option value="all">All Categories</option>
                <option value="roads">Roads & Transport</option>
                <option value="water">Water & Sanitation</option>
                <option value="safety">Public Safety & Lighting</option>
                <option value="waste">Garbage & Solid Waste</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <AlertCircle size={12} className="mr-1 text-danger" /> Priority
              </label>
              <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="input-field py-2.5 text-xs bg-slate-50/50"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="med">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical Urgency</option>
              </select>
            </div>

            {/* Ward/Location Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                <MapPin size={12} className="mr-1 text-warning" /> Location (Ward)
              </label>
              <select 
                value={ward} 
                onChange={(e) => setWard(e.target.value)}
                className="input-field py-2.5 text-xs bg-slate-50/50"
              >
                <option value="all">All Wards (Ward 1-8)</option>
                <option value="7">Ward 7 (Kanjhawala)</option>
                <option value="5">Ward 5 (Rohini Sector B)</option>
                <option value="3">Ward 3 (Sultanpuri)</option>
                <option value="1">Ward 1 (Narela)</option>
              </select>
            </div>

            {/* Submit Actions button group */}
            <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
              <div className="text-[11px] text-slate-400 font-semibold">
                Filters applied: <strong className="text-secondary font-bold">{activeFilters.dateRange}</strong>, <strong className="text-secondary font-bold">{activeFilters.category}</strong>, <strong className="text-secondary font-bold">{activeFilters.priority}</strong>, <strong className="text-secondary font-bold">{activeFilters.ward}</strong>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-slate-500 font-bold hover:text-slate-900 px-3 py-2 transition-colors"
                >
                  Reset
                </button>
                <Button 
                  type="submit" 
                  size="sm"
                  className="px-5"
                >
                  {!filtersApplied ? (
                    <>
                      <RefreshCw size={12} className="mr-1.5 animate-spin" /> Applying...
                    </>
                  ) : 'Apply Filters'}
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* STATISTICS SUMMARY CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Chart 1: Complaint Trends Area Chart */}
          <Card className="lg:col-span-8 p-6 bg-white border border-slate-100 shadow-premium space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-secondary">General Complaint Volume Trends</h3>
                <p className="text-xs text-slate-400 mt-0.5">Historical growth patterns by month</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">Recharts styling</span>
              </div>
            </div>

            <div className="relative h-64 w-full">
              {/* SVG Area graph with grid lines */}
              <svg className="w-full h-full text-slate-200" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trendsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Horizontal gridlines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#F8FAFC" strokeWidth="2" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#F8FAFC" strokeWidth="2" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#F8FAFC" strokeWidth="2" />
                {/* Graph Area */}
                <path d="M 0,200 L 0,150 Q 80,120 160,110 T 320,60 T 480,30 L 500,30 L 500,200 Z" fill="url(#trendsGradient)" />
                <path d="M 0,150 Q 80,120 160,110 T 320,60 T 480,30 L 500,30" fill="none" stroke="#2563EB" strokeWidth="3" />
                
                {/* Second dashed line (Previous period comparison) */}
                <path d="M 0,180 Q 80,160 160,140 T 320,110 T 480,90 L 500,90" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun (Active)</span>
            </div>
          </Card>

          {/* Chart 2: Category Distribution segmented charts */}
          <Card className="lg:col-span-4 p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between space-y-6">
            <div>
              <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                Category Distribution
              </h4>
              
              <div className="flex items-center justify-center py-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#2563EB" strokeWidth="6" strokeDasharray="42 100" />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#14B8A6" strokeWidth="6" strokeDasharray="28 100" strokeDashoffset="-42" />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#F59E0B" strokeWidth="6" strokeDasharray="18 100" strokeDashoffset="-70" />
                  <circle r="16" cx="16" cy="16" fill="transparent" stroke="#EF4444" strokeWidth="6" strokeDasharray="12 100" strokeDashoffset="-88" />
                </svg>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4 font-semibold grid grid-cols-2 gap-2">
              <span className="inline-flex items-center"><span className="w-2.5 h-2.5 rounded bg-[#2563EB] mr-1.5" /> Sanitation (42%)</span>
              <span className="inline-flex items-center"><span className="w-2.5 h-2.5 rounded bg-[#14B8A6] mr-1.5" /> Roads (28%)</span>
              <span className="inline-flex items-center"><span className="w-2.5 h-2.5 rounded bg-[#F59E0B] mr-1.5" /> Lighting (18%)</span>
              <span className="inline-flex items-center"><span className="w-2.5 h-2.5 rounded bg-[#EF4444] mr-1.5" /> Safety (12%)</span>
            </div>
          </Card>
        </div>

        {/* ADDITIONAL CHARTS AND TOP LOCATIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Chart 3: Monthly growth index compared to targets */}
          <Card className="lg:col-span-6 p-6 bg-white border border-slate-100 shadow-premium space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">
                Monthly Resolution growth
              </h4>
              <span className="inline-flex items-center text-xs text-success font-bold">
                <TrendingUp size={14} className="mr-1" /> +18.4% growth
              </span>
            </div>

            <div className="relative h-48 w-full flex items-end justify-between space-x-3 pt-4">
              {/* Styled columns comparison representation */}
              {[40, 58, 62, 70, 89].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-slate-100 h-32 rounded-t-lg relative overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${val}%` }} 
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="absolute bottom-0 inset-x-0 bg-primary" 
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{['Feb', 'Mar', 'Apr', 'May', 'Jun'][idx]}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* List 4: Top Hotspot locations ranking bar charts */}
          <Card className="lg:col-span-6 p-6 bg-white border border-slate-100 shadow-premium space-y-6">
            <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
              Top Active Hotspots (Wards)
            </h4>

            <div className="space-y-4 pt-2">
              {topLocations.map((loc, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-secondary">{loc.name}</span>
                    <span className="text-slate-400 font-bold">{loc.count} cases</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`${loc.color} h-full rounded-full`} style={{ width: `${loc.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* BOTTOM SECTION: GEOSPATIAL MAP DETAILS & AI SUMMARY REPORTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-stretch">
          
          {/* Mini heatmap sector boundaries */}
          <Card className="lg:col-span-7 p-6 bg-white border border-slate-100 shadow-premium space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-secondary">Interactive Heatmap grid</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click sectors on map to load targeted ward statistics</p>
            </div>

            {/* Custom SVG maps */}
            <div className="relative bg-slate-50 border border-slate-200/80 rounded-large overflow-hidden h-72">
              <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#F8FAFC" />
                {/* Ward 7 Sector */}
                <path d="M 40,40 L 180,40 L 160,160 L 40,140 Z" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
                <text x="70" y="80" fill="#EF4444" className="text-[10px] font-extrabold">Ward 7 (Kanjhawala)</text>
                <circle cx="100" cy="110" r="4" fill="#EF4444" className="animate-pulse" />

                {/* Ward 5 Sector */}
                <path d="M 180,40 L 360,60 L 320,180 L 160,160 Z" fill="#F97316" fillOpacity="0.1" stroke="#F97316" strokeWidth="2" />
                <text x="210" y="90" fill="#EA580C" className="text-[10px] font-extrabold">Ward 5 (Rohini B)</text>

                {/* Ward 3 Sector */}
                <path d="M 40,140 L 160,160 L 130,220 L 30,210 Z" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="2" />
                <text x="50" y="180" fill="#D97706" className="text-[10px] font-extrabold">Ward 3</text>
              </svg>
            </div>
          </Card>

          {/* AI Insights & recommendations summary reports */}
          <Card className="lg:col-span-5 p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-bold">
                <Sparkles size={16} />
                <span className="text-xs uppercase tracking-wider">AI Planning Anomaly Detections</span>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 text-xs">
                <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-red-800">Spike Detected in Ward 5 Outages</h5>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Lighting complaints rose by 40% on Sector B Main Road. High density of reports recorded during evening hours (07:00 PM - 09:00 PM). Suggests direct maintenance patrol.
                  </p>
                </div>

                <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-amber-800">Duplicate Alert: Ward 3 Crossing</h5>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    AI grouped 12 separate scooter pothole reports on Sultanpuri crossing into a single planning issue. Estimated budget target: $5,000.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              ⚡ Reports compiled hourly using Google Gemini API.
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
