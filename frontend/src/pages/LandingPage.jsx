import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mic, FileText, MapPin, AlertTriangle, BarChart3, 
  Lightbulb, ArrowRight, ShieldAlert, Users, HelpCircle,
  TrendingUp, Layers, CheckCircle2, ChevronRight
} from 'lucide-react';
import PublicLayout from '../layouts/PublicLayout.jsx';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/atoms/Card.jsx';

const LandingPage = () => {
  const navigate = useNavigate();

  // Container motion presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const featureCards = [
    {
      icon: <Mic className="text-primary w-6 h-6 stroke-[2]" />,
      title: "Voice Complaint Support",
      description: "Citizens can submit feedback in their local dialect. AI handles transcription and translates it instantly."
    },
    {
      icon: <FileText className="text-accent w-6 h-6 stroke-[2]" />,
      title: "AI Summarization",
      description: "Gemini summarizes lengthy citizen text descriptions into clear, digestible, one-line action cards."
    },
    {
      icon: <MapPin className="text-warning w-6 h-6 stroke-[2]" />,
      title: "Geographic Heatmap",
      description: "Auto-detects complaint location coordinates to highlight infrastructure and service hotspots."
    },
    {
      icon: <ShieldAlert className="text-danger w-6 h-6 stroke-[2]" />,
      title: "Priority Detection",
      description: "AI analyzes keywords, urgency indices, and historical context to prioritize vital community issues."
    },
    {
      icon: <BarChart3 className="text-secondary w-6 h-6 stroke-[2]" />,
      title: "Constituency Analytics",
      description: "Interactive analytics of complaint trends, category distributions, and constituency performance."
    },
    {
      icon: <Lightbulb className="text-success w-6 h-6 stroke-[2]" />,
      title: "AI Recommendation Engine",
      description: "Provides MPs with high-impact development suggestions mapped directly to community demand hotspots."
    }
  ];

  const workflowSteps = [
    {
      id: "01",
      title: "Citizen Submits Complaint",
      desc: "Text, voice recordings, or pictures uploaded along with location tagging via an intuitive citizen panel.",
      icon: <Mic className="w-5 h-5 text-primary" />
    },
    {
      id: "02",
      title: "AI Deciphers Content",
      desc: "Google Gemini API transcribes audio, identifies language, and translates complaints into standard format.",
      icon: <HelpCircle className="w-5 h-5 text-accent" />
    },
    {
      id: "03",
      title: "Automatic Categorization",
      desc: "Issues are grouped (e.g. Roads, Water, Electricity) and cross-checked for potential duplicate entries.",
      icon: <Layers className="w-5 h-5 text-warning" />
    },
    {
      id: "04",
      title: "Dashboard Integration",
      desc: "Geospatial markers and priority scores are calculated instantly, updating the central admin registry.",
      icon: <TrendingUp className="w-5 h-5 text-secondary" />
    },
    {
      id: "05",
      title: "MP Actions & Feedback",
      desc: "AI advises MPs on project budgets, priority rankings, and provides direct status updates back to citizens.",
      icon: <CheckCircle2 className="w-5 h-5 text-success" />
    }
  ];

  return (
    <PublicLayout>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 bg-grid-pattern">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide">
              <span>🏛️ Hackathon Showcase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>v1.0.0 Live</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-secondary leading-[1.1]">
              Transform Citizen Voices into <span className="text-gradient-primary">Smarter</span> Development Decisions
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Empower your constituency. Our AI-driven platform captures voice & text feedback, detects development priorities, and equips Members of Parliament with real-time analytics to allocate funds efficiently.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" onClick={() => navigate('/login')} className="shadow-lg shadow-primary/25">
                Get Started <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                View MP Dashboard
              </Button>
            </div>

            {/* Quick stats banner */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-6">
              <div>
                <span className="block text-2xl font-extrabold text-secondary">98%</span>
                <span className="text-xs text-slate-500 font-medium">AI Translation Acc.</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-secondary">10x</span>
                <span className="text-xs text-slate-500 font-medium">Faster Response</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-secondary">100%</span>
                <span className="text-xs text-slate-500 font-medium">Transparent Civic Flow</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive UI Mockup Illustration */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Background design accents */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-30 blur-lg" />
            
            {/* Interactive Mockup Container */}
            <div className="relative bg-slate-900 text-white rounded-large shadow-2xl border border-slate-800 overflow-hidden select-none">
              {/* Window Header */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="text-[11px] font-semibold text-slate-500 font-mono tracking-wider">MP ANALYTICS DASHBOARD</div>
                <div className="w-8" />
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-6 space-y-6 bg-slate-900">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Complaints</span>
                    <span className="block text-xl font-bold mt-1 text-primary-light">1,482</span>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Resolved</span>
                    <span className="block text-xl font-bold mt-1 text-emerald-400">89%</span>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">AI Priority Core</span>
                    <span className="block text-xl font-bold mt-1 text-teal-400">92/100</span>
                  </div>
                </div>

                {/* Main section: Heatmap list */}
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Top Priority Hotspots</h4>
                    <span className="text-[10px] bg-primary/20 text-primary-light border border-primary/40 px-2 py-0.5 rounded-full font-bold">AI Recommended</span>
                  </div>

                  {/* Hotspot list item 1 */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/80">
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
                      <div>
                        <span className="text-xs font-bold block">Water Sanitation Pipeline</span>
                        <span className="text-[10px] text-slate-400">Sector 4 Area (243 complaints)</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-danger bg-danger/10 px-2 py-0.5 rounded border border-danger/20">Critical</span>
                  </div>

                  {/* Hotspot list item 2 */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-950/40 rounded-lg border border-slate-800/80">
                    <div className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-warning" />
                      <div>
                        <span className="text-xs font-bold block">Streetlight Safety Grids</span>
                        <span className="text-[10px] text-slate-400">Highway Ring (112 complaints)</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20">Medium</span>
                  </div>
                </div>

                {/* AI Recommendations Graph visualization mock */}
                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">Weekly Complaint Volume</span>
                  <div className="h-16 flex items-end justify-between space-x-2 pt-2">
                    {[35, 45, 60, 40, 75, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-800 rounded-t-sm relative group" style={{ height: '100%' }}>
                        <motion.div 
                          initial={{ height: 0 }} 
                          animate={{ height: `${h}%` }} 
                          transition={{ duration: 1, delay: i * 0.05 }}
                          className={`w-full rounded-t-sm ${i === 7 ? 'bg-accent' : 'bg-primary'}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Problem Statement Section */}
      <section id="problem" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">The Problem</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Constituency Voices Are Often Lost In Noise
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Every day, elected representatives receive hundreds of development requests via physical letters, social media, voice notes, and public forums. This unstructured, siloed data makes it impossible to locate critical community needs quickly, leading to duplicate projects and misallocated funds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border border-slate-100 shadow-premium space-y-4">
              <div className="w-10 h-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center font-bold">1</div>
              <h4 className="text-lg font-bold text-secondary">Fragmented Communication</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Requests are scattered across WhatsApp, paper letters, emails, and grievance portals. There is no unified register to capture it all.
              </p>
            </Card>

            <Card className="p-8 border border-slate-100 shadow-premium space-y-4">
              <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center font-bold">2</div>
              <h4 className="text-lg font-bold text-secondary">Language & Format Barriers</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Constituents speak local dialects and dialects, which complicates transcription, translation, and duplicate checking for support desks.
              </p>
            </Card>

            <Card className="p-8 border border-slate-100 shadow-premium space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900/10 text-slate-700 flex items-center justify-center font-bold">3</div>
              <h4 className="text-lg font-bold text-secondary">Lack of Data-Driven Planning</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                MPs lack mapping overlays to view exactly where the densest complaints lie. Budget planning depends on guesswork instead of concrete datasets.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. AI Workflow Illustration (How it Works) */}
      <section id="how-it-works" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <h2 className="text-xs font-bold text-accent uppercase tracking-widest">How AI Works</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              An End-to-End Civic AI Pipeline
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Our smart architecture coordinates Gemini AI translation, natural language processing, and mapping algorithms to translate citizen voices into targeted MP actions.
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for workflow steps */}
            <div className="hidden lg:block absolute top-[50px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-primary/10 via-accent/30 to-success/10 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {workflowSteps.map((step, idx) => (
                <div key={idx} className="space-y-4 text-center lg:text-left">
                  <div className="flex flex-col items-center lg:items-start space-y-3">
                    {/* Circle icon marker */}
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-premium flex items-center justify-center relative">
                      {step.icon}
                      <span className="absolute -top-1.5 -right-1.5 text-[9px] font-extrabold bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                        {step.id}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-secondary pt-2">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed px-4 lg:px-0">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Features Grid */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Platform Features</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              Comprehensive Tools Designed for Civic Governance
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Every element of the platform is designed to guarantee high readability, intuitive mobile interaction, and responsive access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => (
              <Card key={idx} hoverEffect className="p-8 border border-slate-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-bold text-secondary">{card.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section id="benefits" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold text-success uppercase tracking-widest">Why This Platform</h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight leading-tight">
                Designed to Deliver Real Civic Impact
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                By bridging communication gaps, People's Priorities equips local administrations to increase accountability, optimize government spends, and ensure citizens see their feedback leading directly to development.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-secondary">National Security Grade</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">All citizen profiles and complaints are protected using JWT standards and secure hosting.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-secondary">Multilingual Inclusion</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">Fully accessible translations support vernacular dialects, removing the English barrier for rural regions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-secondary">Explainable AI Framework</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">AI decisions are explainable. MPs are shown specific reasons and calculations backing priority scores.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="p-6 bg-white border border-slate-100 shadow-premium">
                <span className="text-gradient-primary text-3xl font-extrabold">95%</span>
                <h4 className="font-bold text-secondary mt-2 text-sm">Reduced Admin Effort</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">AI filters out duplicates and automates complaint routing, cutting manual clerical work.</p>
              </Card>

              <Card className="p-6 bg-white border border-slate-100 shadow-premium">
                <span className="text-gradient-primary text-3xl font-extrabold">&lt; 3 Min</span>
                <h4 className="font-bold text-secondary mt-2 text-sm">Rapid Complaint Filing</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Voice recordings enable citizens to file complaints quickly on mobile devices.</p>
              </Card>

              <Card className="p-6 bg-white border border-slate-100 shadow-premium">
                <span className="text-gradient-primary text-3xl font-extrabold">40%</span>
                <h4 className="font-bold text-secondary mt-2 text-sm">Better Budget Allocation</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Heatmaps highlight actual core needs over loud voices, saving valuable development budget.</p>
              </Card>

              <Card className="p-6 bg-white border border-slate-100 shadow-premium">
                <span className="text-gradient-primary text-3xl font-extrabold">Real-time</span>
                <h4 className="font-bold text-secondary mt-2 text-sm">Citizen Updates</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Automated status changes text back to constituents, keeping citizens loop on resolution progress.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action (CTA) Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_60%)]" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Ready to Build a Smarter, <br className="hidden sm:inline" />More Transparent Constituency?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Register your constituency details or log in to submit complaints as a citizen or view planning recommendations as an MP.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => navigate('/login')} className="w-full sm:w-auto shadow-lg shadow-primary/20">
              Get Started Now <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-slate-800 border border-slate-700/50" onClick={() => navigate('/login')}>
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
