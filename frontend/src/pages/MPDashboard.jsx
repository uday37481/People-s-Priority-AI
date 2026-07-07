import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Landmark, Users, CheckCircle2, Clock, AlertTriangle, 
  ArrowUpRight, BarChart3, MapPin, Eye, Filter, Calendar,
  ShieldCheck, CheckSquare, Plus, ChevronRight, Download
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Card from '../components/atoms/Card.jsx';
import Button from '../components/atoms/Button.jsx';

const MPDashboard = () => {
  const navigate = useNavigate();
  const [selectedWardId, setSelectedWardId] = useState(7); // default select Ward 7

  // Mock Constituency Data Wards
  const wardDetails = {
    7: { name: "Ward 7 (Kanjhawala)", complaints: 243, topIssue: "Water Drainage Rupture", status: "Critical Heatspot" },
    5: { name: "Ward 5 (Rohini Sectors)", complaints: 112, topIssue: "Streetlight Outages", status: "Medium Priority" },
    3: { name: "Ward 3 (Sultanpuri)", complaints: 88, topIssue: "Pothole Congestion", status: "Moderate Heatspot" },
    1: { name: "Ward 1 (Narela Hub)", complaints: 32, topIssue: "Garbage Accumulation", status: "Stable Area" }
  };

  const selectedWard = wardDetails[selectedWardId] || wardDetails[7];

  // Latest complaints database
  const latestComplaints = [
    { id: "PP-2402", citizen: "Amit Sharma", category: "Public Safety", priority: "High", title: "Ring Road Streetlights Failure", time: "10m ago" },
    { id: "PP-2401", citizen: "Jane Doe", category: "Sanitation", priority: "High", title: "Sector 4 Ruptured Water Valve", time: "2h ago" },
    { id: "PP-2398", citizen: "Rohan Gupta", category: "Roads", priority: "Medium", title: "Potholes near metro station gate", time: "5h ago" },
    { id: "PP-2391", citizen: "Sunita Devi", category: "Sanitation", priority: "Critical", title: "Open sewer drain by Primary School", time: "1d ago" }
  ];

  // Top AI Recommendations mapped to budgets
  const aiRecommendations = [
    {
      rank: "#1",
      project: "Construct Drainage Grid",
      location: "Ward 7 Sector B",
      score: "98/100",
      budget: "$24,500",
      impact: "2,400+ residents",
      reason: "Resolves 243 active water sanitation cases and avoids school road blockage."
    },
    {
      rank: "#2",
      project: "Restore Public Lighting",
      location: "Ward 5 Ring Road",
      score: "92/100",
      budget: "$8,200",
      impact: "1,100+ commuters",
      reason: "Addresses 112 lighting and evening safety reports in dense intersections."
    },
    {
      rank: "#3",
      project: "Pothole Patching dispatch",
      location: "Ward 3 Crossing",
      score: "85/100",
      budget: "$5,000",
      impact: "800+ vehicles/day",
      reason: "Reduces scooter slide accidents and gridlock congestion."
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        
        {/* 1. TOP DYNAMIC INSIGHT BANNER */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-r from-[#2563EB]/15 to-[#14B8A6]/10 border border-[#2563EB]/25 p-5 rounded-large flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
        >
          {/* Subtle decoration nodes */}
          <div className="absolute right-[-10%] top-[-50%] w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          
          <div className="flex items-center space-x-3.5 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 animate-pulse">
              <Sparkles size={20} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest block">Top AI Planning Recommendation</span>
              <p className="text-sm font-bold text-slate-800 dark:text-white mt-0.5 leading-snug">
                Construct new drainage pipeline grid in <span className="text-primary hover:underline cursor-pointer" onClick={() => setSelectedWardId(7)}>Ward 7 (Kanjhawala)</span> to resolve 243 waterlogging issues.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 relative z-10 w-full sm:w-auto">
            <Button size="sm" onClick={() => navigate('/mp/analytics')} className="w-full sm:w-auto text-xs py-2">
              Review Project Plan <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* 2. STATS KPI GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Active Complaints</span>
              <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500"><Users size={16} /></div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-extrabold text-secondary tracking-tight">1,482</span>
                <span className="text-[10px] text-success font-bold ml-1.5 inline-flex items-center">
                  +12% <span className="text-slate-400 font-medium ml-1">vs last month</span>
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">High/Critical Urgency</span>
              <div className="p-1.5 rounded-lg bg-red-50 text-danger"><AlertTriangle size={16} /></div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-extrabold text-secondary tracking-tight">384</span>
                <span className="text-[10px] text-danger font-bold ml-1.5 inline-flex items-center">
                  +8% <span className="text-slate-400 font-medium ml-1">needs actions</span>
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Case Resolve Rate</span>
              <div className="p-1.5 rounded-lg bg-emerald-50 text-success"><CheckCircle2 size={16} /></div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-extrabold text-secondary tracking-tight">89.4%</span>
                <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-success h-full" style={{ width: '89.4%' }} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between h-32">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Verified Citizens</span>
              <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500"><CheckSquare size={16} /></div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-extrabold text-secondary tracking-tight">8,102</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Ward 1-8 Total</span>
              </div>
            </div>
          </Card>
        </div>

        {/* 3. CHARTS GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          
          {/* Custom SVG Line Chart for Weekly Trends */}
          <Card className="lg:col-span-8 p-6 bg-white border border-slate-100 shadow-premium space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-secondary">Weekly Complaint Volume</h3>
                <p className="text-xs text-slate-400 mt-0.5">Summary trends across water, road and electric sectors</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Interactive Chart</span>
              </div>
            </div>

            {/* Custom SVG Area chart */}
            <div className="relative h-64 w-full">
              <svg className="w-full h-full text-slate-200" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#F1F5F9" strokeWidth="1" />
                {/* Area Gradient */}
                <path d="M 0,200 L 0,160 Q 60,110 120,130 T 240,60 T 360,90 T 480,40 L 500,40 L 500,200 Z" fill="url(#chartGradient)" />
                {/* Area Stroke Line */}
                <path d="M 0,160 Q 60,110 120,130 T 240,60 T 360,90 T 480,40 L 500,40" fill="none" stroke="#2563EB" strokeWidth="3" />
                {/* Circular Node Tagger highlights */}
                <circle cx="240" cy="60" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
                <circle cx="480" cy="40" r="5" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="3" />
              </svg>
              {/* Overlay stats tag */}
              <div className="absolute top-8 left-[230px] bg-slate-900 text-white px-2.5 py-1 rounded-lg text-[9px] font-mono shadow-md border border-slate-800">
                Peak: 382 issues (Week 3)
              </div>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4 (Active)</span>
            </div>
          </Card>

          {/* Side distribution widgets */}
          <div className="lg:col-span-4 flex flex-col space-y-6 justify-between">
            {/* Category distribution pie representation */}
            <Card className="p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between flex-1">
              <div>
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                  Category Distribution
                </h4>
                
                <div className="flex items-center justify-center py-4">
                  {/* SVG Pie Wheel representation */}
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 32 32">
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#2563EB" strokeWidth="6" strokeDasharray="50 100" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#14B8A6" strokeWidth="6" strokeDasharray="30 100" strokeDashoffset="-50" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#F59E0B" strokeWidth="6" strokeDasharray="20 100" strokeDashoffset="-80" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-100 font-semibold">
                <span className="inline-flex items-center"><span className="w-2 h-2 rounded bg-primary mr-1" /> Water (50%)</span>
                <span className="inline-flex items-center"><span className="w-2 h-2 rounded bg-accent mr-1" /> Roads (30%)</span>
                <span className="inline-flex items-center"><span className="w-2 h-2 rounded bg-warning mr-1" /> Lighting (20%)</span>
              </div>
            </Card>

            {/* Priority Distribution Horizontal Progress bars */}
            <Card className="p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between flex-1">
              <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                Priority breakdown
              </h4>
              <div className="space-y-3.5 pt-2 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-danger flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-danger mr-1.5 animate-pulse" /> Critical</span>
                    <span className="text-secondary">24% (88)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-danger h-full" style={{ width: '24%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-orange-500">High Urgency</span>
                    <span className="text-secondary">48% (180)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: '48%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 4. GEOSPATIAL HEATMAP PREVIEW & AI RECOMMENDATIONS LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-stretch">
          
          {/* constituency Heatmap Preview */}
          <Card className="lg:col-span-5 p-6 bg-white border border-slate-100 shadow-premium space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-base text-secondary">Constituency Hotspots</h3>
                <p className="text-xs text-slate-400 mt-0.5">Geospatial complaint density by Ward Sector</p>
              </div>
            </div>

            {/* Heatmap Grid map simulation */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[7, 5, 3, 1].map((w) => {
                const isSelected = selectedWardId === w;
                const colors = {
                  7: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20",
                  5: "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/20",
                  3: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/20",
                  1: "bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-900"
                };

                return (
                  <div 
                    key={w} 
                    onClick={() => setSelectedWardId(w)}
                    className={`p-4 border rounded-large cursor-pointer select-none text-left transition-all duration-200
                      ${colors[w]} 
                      ${isSelected ? 'ring-4 ring-primary/20 scale-[1.02] shadow-md border-primary' : 'hover:opacity-90'}
                    `}
                  >
                    <span className="text-[10px] font-extrabold uppercase tracking-widest block opacity-60">Ward {w}</span>
                    <span className="block text-2xl font-extrabold mt-1.5 tracking-tight">{wardDetails[w].complaints}</span>
                    <span className="text-[10px] font-semibold mt-1 block truncate">{wardDetails[w].topIssue}</span>
                  </div>
                );
              })}
            </div>

            {/* Selected Ward status details drawer representation */}
            <div className="p-3.5 bg-slate-900 text-white rounded-large space-y-2 mt-4">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <span>Selected Sector Data</span>
                <span className="text-primary-light">Ward {selectedWardId}</span>
              </div>
              <h5 className="text-xs font-bold">{selectedWard.name}</h5>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Status: <strong className="text-white">{selectedWard.status}</strong></span>
                <span>Active: <strong className="text-white">{selectedWard.complaints} cases</strong></span>
              </div>
            </div>
          </Card>

          {/* AI Recommendation project allocation Panel */}
          <Card className="lg:col-span-7 p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-base text-secondary">AI Planning Recommendations</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Top-ranked infrastructure allocations based on community feedback</p>
                </div>
              </div>

              {/* Recommendations ranking list */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {aiRecommendations.map((rec) => (
                  <div key={rec.rank} className="p-4 bg-slate-50/80 rounded-large border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{rec.rank}</span>
                        <h5 className="font-bold text-sm text-secondary truncate">{rec.project}</h5>
                        <span className="text-[10px] text-slate-400">({rec.location})</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed italic">
                        "{rec.reason}"
                      </p>
                      <div className="flex items-center space-x-4 text-[10px] text-slate-400 pt-1 font-semibold">
                        <span>Impact: <strong className="text-slate-600">{rec.impact}</strong></span>
                        <span>•</span>
                        <span>Estimate: <strong className="text-slate-600">{rec.budget}</strong></span>
                      </div>
                    </div>
                    
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Priority Score</span>
                      <span className="text-sm font-extrabold text-primary">{rec.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/mp/analytics')}>
              View Detailed Budget Allocations <ArrowUpRight size={14} className="ml-1" />
            </Button>
          </Card>
        </div>

        {/* 5. LATEST COMPLAINTS LOG TABLE */}
        <Card className="p-6 bg-white border border-slate-100 shadow-premium space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-secondary">Latest Complaint Submissions</h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time incoming requests from active citizens in Ward 1-8</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/mp/analytics')}>
              View All Complaints
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3 pr-2">Case ID</th>
                  <th className="pb-3 px-2">Citizen</th>
                  <th className="pb-3 px-2">Subject / Title</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Urgency</th>
                  <th className="pb-3 pl-2">Incoming</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-xs text-slate-600">
                {latestComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3.5 pr-2 font-mono font-bold text-slate-900 dark:text-slate-300">{c.id}</td>
                    <td className="py-3.5 px-2 font-semibold text-secondary">{c.citizen}</td>
                    <td className="py-3.5 px-2 font-medium text-slate-700 max-w-xs truncate">{c.title}</td>
                    <td className="py-3.5 px-2">{c.category}</td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold
                        ${c.priority === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200/50' : 'bg-orange-50 text-orange-700 border border-orange-200/50'}
                      `}>
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-3.5 pl-2 text-slate-400 font-medium">{c.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default MPDashboard;
