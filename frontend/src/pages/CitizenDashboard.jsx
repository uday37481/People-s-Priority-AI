import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle, Clock, AlertCircle, FileText, 
  MapPin, ShieldCheck, ArrowRight, CornerRightDown, 
  ExternalLink, Calendar, MessageSquare, Info
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Card from '../components/atoms/Card.jsx';
import Button from '../components/atoms/Button.jsx';

const CitizenDashboard = () => {
  const navigate = useNavigate();

  // Mock Citizen Complaints Data
  const initialComplaints = [
    {
      id: "PP-2401",
      title: "Broken Water Pipe & Waste Flooding",
      category: "Water & Sanitation",
      priority: "High",
      status: "Under Review",
      date: "2026-07-04",
      description: "Large water pipeline rupture near Sector 4 community park has flooded the walking tracks and mixed with local garbage. Poses serious health risks.",
      aiSummary: "Ruptured pipeline causing local flooding and sanitary hazard near community park.",
      timeline: [
        { title: "Complaint Submitted", desc: "Citizen tagged location and uploaded voice memo", date: "Jul 4, 10:15 AM", active: true },
        { title: "Gemini AI Processed", desc: "Voice transcribed and summarized automatically", date: "Jul 4, 10:17 AM", active: true },
        { title: "Under Review", desc: "Assigned to Ward 5 Development desk", date: "Jul 5, 02:30 PM", active: true },
        { title: "MP Action Recommended", desc: "Prioritized in Ward drainage project backlog", date: "Pending", active: false },
        { title: "Resolved", desc: "Repair pipeline & sanitization audit", date: "Pending", active: false }
      ]
    },
    {
      id: "PP-2402",
      title: "Faulty Streetlights & Safety Issues",
      category: "Public Safety",
      priority: "High",
      status: "Submitted",
      date: "2026-07-06",
      description: "Over 8 streetlights on Ring Road Sector B have been non-functional for 2 weeks, leading to safety concerns for evening commuters.",
      aiSummary: "Non-functional streetlights on Ring Road Sector B creating safety concerns.",
      timeline: [
        { title: "Complaint Submitted", desc: "Citizen tagged location and uploaded image", date: "Jul 6, 09:00 AM", active: true },
        { title: "Gemini AI Processed", desc: "Classified category as Public Safety", date: "Jul 6, 09:02 AM", active: true },
        { title: "Under Review", desc: "Awaiting assignment to Maintenance division", date: "Pending", active: false },
        { title: "MP Action Recommended", desc: "", date: "Pending", active: false },
        { title: "Resolved", desc: "", date: "Pending", active: false }
      ]
    },
    {
      id: "PP-2384",
      title: "Potholes on High Street Main Crossing",
      category: "Roads & Transport",
      priority: "Medium",
      status: "Resolved",
      date: "2026-06-20",
      description: "Deep potholes at the main crossing are slowing traffic and causing scooter accidents.",
      aiSummary: "Severe potholes on High Street causing minor road hazards and slow traffic.",
      timeline: [
        { title: "Complaint Submitted", desc: "Logged via web portal", date: "Jun 20, 08:30 AM", active: true },
        { title: "Gemini AI Processed", desc: "Categorized and priority score calculated", date: "Jun 20, 08:32 AM", active: true },
        { title: "Under Review", desc: "Dispatched to Public Works Dept (PWD)", date: "Jun 22, 11:00 AM", active: true },
        { title: "Action Scheduled", desc: "MP sanctioned quick patching funds", date: "Jun 25, 04:00 PM", active: true },
        { title: "Resolved", desc: "Potholes patched and verified by Ward supervisor", date: "Jul 01, 10:00 AM", active: true }
      ]
    },
    {
      id: "PP-2391",
      title: "Open Drainage Grate Near Primary School",
      category: "Water & Sanitation",
      priority: "Critical",
      status: "Under Review",
      date: "2026-07-02",
      description: "An open sewer storm drain is left uncovered right in front of the gate of Ward 5 primary school. Children play nearby.",
      aiSummary: "Open stormwater drainage grate near school gate poses severe falling hazard for children.",
      timeline: [
        { title: "Complaint Submitted", desc: "Citizen tagged school gate on map", date: "Jul 2, 12:40 PM", active: true },
        { title: "Gemini AI Processed", desc: "Flagged as Critical due to proximity to school", date: "Jul 2, 12:41 PM", active: true },
        { title: "Under Review", desc: "Passed to PWD Urgency Response Team", date: "Jul 3, 08:00 AM", active: true },
        { title: "MP Action Recommended", desc: "Dispatched direct repair order to contractor", date: "Jul 5, 11:30 AM", active: true },
        { title: "Resolved", desc: "", date: "Pending", active: false }
      ]
    }
  ];

  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaintId, setSelectedComplaintId] = useState(initialComplaints[0].id);

  const selectedComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  // Colors mapping helper
  const priorityColors = {
    Low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    Medium: "bg-amber-50 text-amber-700 border border-amber-200/50 dark:bg-amber-950/20 dark:text-amber-400",
    High: "bg-orange-50 text-orange-700 border border-orange-200/50 dark:bg-orange-950/20 dark:text-orange-400",
    Critical: "bg-red-50 text-red-700 border border-red-200/50 dark:bg-red-950/20 dark:text-red-400"
  };

  const statusColors = {
    Submitted: "bg-blue-50 text-blue-700 border border-blue-200/50 dark:bg-blue-950/20 dark:text-blue-400",
    "Under Review": "bg-warning/10 text-warning border border-warning/20",
    Resolved: "bg-success/10 text-success border border-success/20"
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        
        {/* TOP ROW: WELCOME CARD & MINI PROFILE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Welcome Card */}
          <Card className="lg:col-span-8 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-tr from-slate-900 to-slate-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/20 text-primary-light border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles size={12} />
                <span>Constituency Ward 5 Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome Back, Arjun Sharma!
              </h2>
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Your feedback counts. Our integrated AI processes your submitted development concerns directly into the Member of Parliament's weekly infrastructure backlog.
              </p>
            </div>
            
            <div className="relative z-10 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-t border-slate-800/80 mt-6">
              <Button size="md" onClick={() => navigate('/dashboard/submit')} className="shadow-lg shadow-primary/25">
                Submit New Complaint <ArrowRight size={14} className="ml-1.5" />
              </Button>
              <a 
                href="#recent" 
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center py-2"
              >
                Track existing issues
              </a>
            </div>
          </Card>

          {/* Citizen Profile Card */}
          <Card className="lg:col-span-4 p-6 flex flex-col justify-between bg-white border border-slate-100 shadow-premium">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Citizen Account</span>
                <span className="flex items-center text-[10px] bg-emerald-50 text-success border border-success/20 px-2 py-0.5 rounded-full font-bold">
                  <ShieldCheck size={10} className="mr-1" /> Verified
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-extrabold text-lg border border-slate-200/50">
                  AS
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-secondary">Arjun Sharma</h4>
                  <p className="text-xs text-slate-400 truncate">arjun.sharma@gmail.com</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Constituency:</span>
                  <span className="font-bold text-secondary">North-West Delhi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Polling Station:</span>
                  <span className="font-bold text-secondary">Ward 5 primary school</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/login')}>
              Update Profile Details
            </Button>
          </Card>
        </div>

        {/* STATS COUNT SUMMARY ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 bg-white border border-slate-100 shadow-premium flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold text-lg">
              4
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-secondary leading-none">4</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">Total Submitted</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-slate-100 shadow-premium flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-secondary leading-none">2</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">Under Review</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-slate-100 shadow-premium flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-secondary leading-none">1</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">Cases Resolved</span>
            </div>
          </Card>

          <Card className="p-5 bg-white border border-slate-100 shadow-premium flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-danger flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <span className="block text-2xl font-extrabold text-secondary leading-none">3</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">High / Critical</span>
            </div>
          </Card>
        </div>

        {/* MAIN SECTION: LIST OF COMPLAINTS + TIMELINE DETAIL */}
        <div id="recent" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Recent Complaints Table list */}
          <Card className="lg:col-span-7 p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-base text-secondary">My Filed Development Requests</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Click any request to view its real-time AI summary and resolution timeline</p>
                </div>
              </div>

              {/* Responsive List / Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      <th className="pb-3 pr-2">Complaint ID</th>
                      <th className="pb-3 px-2">Category</th>
                      <th className="pb-3 px-2">Priority</th>
                      <th className="pb-3 px-2">Status</th>
                      <th className="pb-3 pl-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {complaints.map((c) => {
                      const isSelected = c.id === selectedComplaintId;
                      return (
                        <tr 
                          key={c.id} 
                          onClick={() => setSelectedComplaintId(c.id)}
                          className={`group cursor-pointer text-xs transition-colors
                            ${isSelected ? 'bg-slate-50/80 font-semibold' : 'hover:bg-slate-50/40'}
                          `}
                        >
                          <td className="py-3.5 pr-2 font-mono font-bold text-slate-800 dark:text-slate-300">
                            {c.id}
                          </td>
                          <td className="py-3.5 px-2 text-slate-600 dark:text-slate-400">
                            {c.category}
                          </td>
                          <td className="py-3.5 px-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${priorityColors[c.priority]}`}>
                              {c.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusColors[c.status]}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3.5 pl-2 text-slate-400 font-medium">
                            {c.date}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-100">
              <span>Showing 4 entries</span>
              <a href="#" className="text-primary font-bold hover:underline inline-flex items-center">
                Export History <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </Card>

          {/* Interactive Timeline Detail */}
          <Card className="lg:col-span-5 p-6 bg-white border border-slate-100 shadow-premium flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complaint status Timeline</span>
                <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{selectedComplaint.id}</span>
              </div>

              {/* Title & Description of Selected */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-secondary">{selectedComplaint.title}</h4>
                <div className="p-3 bg-indigo-50/40 dark:bg-slate-900/50 border border-indigo-100/30 rounded-large space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-primary text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Gemini AI Summary</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{selectedComplaint.aiSummary}"
                  </p>
                </div>
              </div>

              {/* Vertical Stepper Timeline */}
              <div className="relative pl-6 space-y-6 pt-2">
                {/* Timeline connector line */}
                <div className="absolute top-0 bottom-0 left-[7px] w-0.5 bg-slate-100 dark:bg-slate-800" />

                {selectedComplaint.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col items-start text-xs space-y-1">
                    {/* Circle icon key */}
                    <div className={`absolute left-[-23px] w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center z-10
                      ${step.active 
                        ? 'bg-primary border-primary ring-4 ring-primary/10' 
                        : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'
                      }
                    `} />
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-bold ${step.active ? 'text-secondary' : 'text-slate-400'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{step.date}</span>
                    </div>
                    {step.desc && (
                      <p className="text-[11px] text-slate-400 leading-normal">{step.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="inline-flex items-center">
                <Calendar size={12} className="mr-1" /> Logged: {selectedComplaint.date}
              </span>
              <span className="inline-flex items-center">
                <MessageSquare size={12} className="mr-1" /> 2 updates
              </span>
            </div>
          </Card>
        </div>

        {/* BOTTOM SECTION: AI INSIGHTS & PLATFORM GENERAL STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          
          {/* AI Insights Card */}
          <Card className="lg:col-span-8 p-6 bg-white border border-slate-100 shadow-premium space-y-4">
            <div className="flex items-center space-x-2 text-primary font-bold">
              <Sparkles size={16} />
              <span className="text-xs uppercase tracking-wider">AI Insights & Topic Groupings for Ward 5</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-large border border-slate-100/50 space-y-2">
                <h5 className="font-bold text-xs text-secondary">Extracted Theme: Water infrastructure</h5>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Water & Sanitation complaints in Ward 5 have increased by 25% over the past 30 days. AI models highlight Sector 4 pipeline and school sewer drains as critical hotspots.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-large border border-slate-100/50 space-y-2">
                <h5 className="font-bold text-xs text-secondary">Extracted Keywords</h5>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['pothole', 'drainage', 'lighting', 'garbage', 'flooding', 'pedestrian safety'].map(word => (
                    <span key={word} className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-medium">
                      #{word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats list Card */}
          <Card className="lg:col-span-4 p-6 bg-white border border-slate-100 shadow-premium space-y-4">
            <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
              Ward 5 Activity Metrics
            </h3>
            <div className="space-y-3.5 text-xs text-slate-500">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Weekly Resolves Rate</span>
                  <span className="text-secondary">75%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-success h-full" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Active Constituency Users</span>
                  <span className="text-secondary">412 Citizens</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
