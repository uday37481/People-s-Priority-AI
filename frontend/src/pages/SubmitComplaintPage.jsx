import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, UploadCloud, MapPin, Mic, 
  Sparkles, CheckCircle2, ChevronRight, FileText, 
  Trash2, X, Play, Square, Search, RefreshCw 
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Card from '../components/atoms/Card.jsx';
import Button from '../components/atoms/Button.jsx';

const SubmitComplaintPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    category: '',
    audioFile: null,
    audioDuration: 0,
    transcript: '',
    imageFiles: [],
    coordinates: { lat: 28.7041, lng: 77.1025 },
    address: 'Near Sector 4 Ward Office, North-West Delhi',
    gpsDetected: false
  });

  const [formErrors, setFormErrors] = useState({});

  // Voice recording mock state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState(null);

  // Categories list
  const categories = [
    "Roads & Transport",
    "Water & Sanitation",
    "Public Safety & Lighting",
    "Garbage & Solid Waste",
    "Parks & Recreation",
    "Other Infrastructure"
  ];

  // Steps names
  const steps = [
    { num: 1, name: "Details" },
    { num: 2, name: "Voice Note" },
    { num: 3, name: "Media Upload" },
    { num: 4, name: "Location" },
    { num: 5, name: "AI Review" }
  ];

  // Helper validation
  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formValues.title.trim()) errors.title = "Complaint title is required";
      if (!formValues.description.trim()) errors.description = "Detailed description is required";
      else if (formValues.description.length < 20) errors.description = "Please provide more details (min 20 chars)";
      if (!formValues.category) errors.category = "Please select a category";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      // If proceeding from voice step, auto-generate mock transcript if recorded
      if (currentStep === 2 && formValues.audioFile && !formValues.transcript) {
        setFormValues(prev => ({
          ...prev,
          transcript: "Citizen Voice transcription: Reporting a major leak on the sewage pipe, waste water is flooding the street and creating bad odor."
        }));
      }
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Mock Voice Recording handlers
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    const interval = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
    setRecordingTimer(interval);
  };

  const stopRecording = () => {
    clearInterval(recordingTimer);
    setIsRecording(false);
    setFormValues(prev => ({
      ...prev,
      audioFile: { name: `Voice_Memo_0707.mp3`, size: '1.2 MB' },
      audioDuration: recordingSeconds,
      transcript: "Citizen Voice transcription: Large leak in the sewer valve near Sector 4 primary school gate. Poses falling risk and health hazards for children."
    }));
  };

  // Mock Image upload handler
  const handleImageDrop = (e) => {
    e.preventDefault();
    setFormValues(prev => ({
      ...prev,
      imageFiles: [
        ...prev.imageFiles,
        { name: "Pothole_Detail.jpg", size: "840 KB", url: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=300&auto=format&fit=crop" }
      ]
    }));
  };

  const removeImage = (idx) => {
    setFormValues(prev => ({
      ...prev,
      imageFiles: prev.imageFiles.filter((_, i) => i !== idx)
    }));
  };

  // Mock Map GPS trigger
  const triggerGPS = () => {
    setFormValues(prev => ({
      ...prev,
      coordinates: { lat: 28.7078, lng: 77.1054 },
      gpsDetected: true,
      address: "Sector 4 Community Gate, North-West Delhi (GPS Verified)"
    }));
  };

  // Final submit handler
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-extrabold text-secondary">Submit Development Request</h2>
            <p className="text-xs text-slate-400 mt-1">Submit infrastructure complaints to your MP. AI transcribes speech & prioritizes files.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard')}>
            Cancel Submission
          </Button>
        </div>

        {/* PROGRESS STEPPER HEADER */}
        <Card className="p-4 bg-white border border-slate-100 shadow-premium">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => {
              const isActive = currentStep === step.num;
              const isCompleted = currentStep > step.num;
              return (
                <React.Fragment key={step.num}>
                  <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300
                      ${isCompleted 
                        ? 'bg-success border-success text-white' 
                        : isActive 
                        ? 'bg-primary border-primary text-white ring-4 ring-primary/10'
                        : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
                      }
                    `}>
                      {isCompleted ? <CheckCircle2 size={14} className="stroke-[2.5]" /> : step.num}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider
                      ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-slate-400'}
                    `}>
                      {step.name}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 max-w-[40px] sm:max-w-[80px] rounded-full mx-2 transition-all duration-300
                      ${isCompleted ? 'bg-success' : 'bg-slate-100 dark:bg-slate-800'}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Card>

        {/* SUCCESS OVERLAY PANEL */}
        {isSuccess ? (
          <Card className="p-8 text-center space-y-6 bg-white border border-slate-100 shadow-premium max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-success flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 size={36} className="stroke-[2.5]" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-secondary">Complaint Filed Successfully</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your request has been summarized by Gemini AI and logged onto the Ward 5 registry database as status <strong>Pending Review</strong>.
              </p>
            </div>

            <div className="pt-2 flex flex-col space-y-2">
              <Button size="md" className="w-full" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
              <Button size="md" variant="outline" className="w-full" onClick={() => {
                setCurrentStep(1);
                setIsSuccess(false);
                setFormValues({
                  title: '',
                  description: '',
                  category: '',
                  audioFile: null,
                  audioDuration: 0,
                  transcript: '',
                  imageFiles: [],
                  coordinates: { lat: 28.7041, lng: 77.1025 },
                  address: 'Near Sector 4 Ward Office, North-West Delhi',
                  gpsDetected: false
                });
              }}>
                Submit Another Request
              </Button>
            </div>
          </Card>
        ) : (
          /* MULTI STEP BODY */
          <form onSubmit={handleFinalSubmit} className="space-y-8">
            
            <AnimatePresence mode="wait">
              {/* STEP 1: COMPLAINT DETAILS */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-slate-100 shadow-premium space-y-6">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-secondary">Step 1: General Details</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Required Field *</span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                      <label htmlFor="title" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Complaint Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formValues.title}
                        onChange={(e) => setFormValues(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Ruptured pipeline flooding Sector 4 park"
                        className={`input-field ${formErrors.title ? 'border-danger focus:ring-danger/10' : ''}`}
                      />
                      {formErrors.title && (
                        <span className="text-[11px] font-medium text-danger block">{formErrors.title}</span>
                      )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                      <label htmlFor="category" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Category *
                      </label>
                      <select
                        id="category"
                        value={formValues.category}
                        onChange={(e) => setFormValues(prev => ({ ...prev, category: e.target.value }))}
                        className={`input-field py-3 px-4 ${formErrors.category ? 'border-danger focus:ring-danger/10' : ''}`}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {formErrors.category && (
                        <span className="text-[11px] font-medium text-danger block">{formErrors.category}</span>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                      <label htmlFor="description" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Detailed Description *
                      </label>
                      <textarea
                        id="description"
                        rows={6}
                        value={formValues.description}
                        onChange={(e) => setFormValues(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the issue in detail. What is damaged? How is this affecting security, safety or clean sanitation in the area? State specific landmarks."
                        className={`input-field resize-none py-3 ${formErrors.description ? 'border-danger focus:ring-danger/10' : ''}`}
                      />
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Provide details to help Gemini AI summarize correctly.</span>
                        <span>{formValues.description.length} chars</span>
                      </div>
                      {formErrors.description && (
                        <span className="text-[11px] font-medium text-danger block">{formErrors.description}</span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* STEP 2: VOICE RECORDING */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-slate-100 shadow-premium space-y-6">
                    <div className="pb-3 border-b border-slate-100">
                      <h4 className="font-extrabold text-sm text-secondary">Step 2: Add Voice Memo (Optional)</h4>
                      <p className="text-xs text-slate-400 mt-1">File voice comments in your local dialect. AI handles transcript & translations.</p>
                    </div>

                    {/* Microphone Simulator Box */}
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-large text-center space-y-4">
                      
                      {/* Pulsing microphone status icon */}
                      <div className="relative">
                        {isRecording && (
                          <span className="absolute inset-0 w-16 h-16 rounded-full bg-danger/20 animate-ping" />
                        )}
                        <button
                          type="button"
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors relative z-10
                            ${isRecording ? 'bg-danger hover:bg-red-600' : 'bg-primary hover:bg-primary-hover'}
                          `}
                        >
                          {isRecording ? <Square size={20} className="fill-current" /> : <Mic size={24} />}
                        </button>
                      </div>

                      {/* Waveform animation simulation */}
                      {isRecording && (
                        <div className="flex items-center space-x-1 h-6 py-1">
                          {[...Array(9)].map((_, i) => (
                            <motion.div 
                              key={i} 
                              animate={{ height: [4, 16, 4] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.06 }}
                              className="w-1 bg-danger rounded-full" 
                            />
                          ))}
                        </div>
                      )}

                      <div>
                        <span className="block text-xs font-bold text-slate-800 dark:text-white">
                          {isRecording ? `Recording... ${recordingSeconds}s` : 'Tap microphone to start recording'}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">Supported dialects: Hindi, English, Tamil, Bengali</span>
                      </div>
                    </div>

                    {/* Audio Transcript Preview Panel */}
                    {formValues.transcript && (
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-large space-y-3">
                        <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider">
                          <Sparkles size={14} />
                          <span>Gemini Live Transcript Preview</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                          "{formValues.transcript}"
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <span>Transcription Accuracy: 98%</span>
                          <button 
                            type="button" 
                            onClick={() => setFormValues(prev => ({ ...prev, transcript: '', audioFile: null }))}
                            className="text-danger hover:underline inline-flex items-center"
                          >
                            <Trash2 size={12} className="mr-1" /> Delete Memo
                          </button>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}

              {/* STEP 3: IMAGE UPLOAD */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-slate-100 shadow-premium space-y-6">
                    <div className="pb-3 border-b border-slate-100">
                      <h4 className="font-extrabold text-sm text-secondary">Step 3: Upload Evidence Images</h4>
                      <p className="text-xs text-slate-400 mt-1">Upload clear images of the location or damage. Maximum size: 5MB per file.</p>
                    </div>

                    {/* Drag and Drop Zone */}
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleImageDrop}
                      onClick={() => handleImageDrop({ preventDefault: () => {} })}
                      className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#E2E8F0] dark:border-slate-800 hover:border-primary rounded-large bg-slate-50/50 dark:bg-slate-900/10 cursor-pointer text-center space-y-3 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <UploadCloud size={20} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800 dark:text-white">Drag and drop images here</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">or click to browse your local device files</span>
                      </div>
                    </div>

                    {/* Previews Grid */}
                    {formValues.imageFiles.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                        {formValues.imageFiles.map((img, idx) => (
                          <div key={idx} className="relative group rounded-xl border border-slate-100 overflow-hidden shadow-sm aspect-video">
                            <img src={img.url} alt="pothole detail mock" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-950 text-white p-1.5 rounded-lg opacity-90 transition-opacity"
                            >
                              <X size={12} />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 bg-slate-900/60 px-2 py-1 text-[10px] text-white truncate font-medium">
                              {img.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}

              {/* STEP 4: INTERACTIVE MAP LOCATION */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-slate-100 shadow-premium space-y-6">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-secondary">Step 4: Tag Incident Location</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Place a pin on the map to pinpoint coordinate boundaries.</p>
                      </div>
                    </div>

                    {/* Map Search input mock */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search size={14} />
                      </div>
                      <input
                        type="text"
                        value={formValues.address}
                        onChange={(e) => setFormValues(prev => ({ ...prev, address: e.target.value }))}
                        className="input-field pl-9 text-xs"
                        placeholder="Search specific address, ward name, or constituency"
                      />
                    </div>

                    {/* Interactive Mock SVG Map */}
                    <div className="relative bg-slate-100 rounded-large border border-slate-200/80 overflow-hidden h-72">
                      {/* Grid background representing roads and boundaries */}
                      <svg className="w-full h-full text-slate-200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#F1F5F9" />
                        {/* Grid lines */}
                        <path d="M 0,50 L 500,50 M 0,150 L 500,150 M 0,250 L 500,250 M 50,0 L 50,300 M 180,0 L 180,300 M 350,0 L 350,300" stroke="#E2E8F0" strokeWidth="2" />
                        {/* Diagonal Parkway Road representation */}
                        <path d="M -10,120 L 520,240" stroke="#FFFFFF" strokeWidth="28" />
                        <path d="M -10,120 L 520,240" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6,4" />
                        {/* Park Area Green Circle */}
                        <circle cx="280" cy="110" r="45" fill="#DCFCE7" stroke="#BBF7D0" strokeWidth="2" />
                        <text x="255" y="113" fill="#166534" className="text-[10px] font-bold">PARK</text>
                      </svg>

                      {/* Interactive click helper tag overlay */}
                      <div className="absolute top-3 left-3 bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                        🗺️ Demo Grid Map: Tap map to shift coordinates pin
                      </div>

                      {/* Floating Map Pin */}
                      <motion.div 
                        animate={{ x: formValues.gpsDetected ? 310 : 250, y: formValues.gpsDetected ? 140 : 160 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="absolute top-0 left-0"
                      >
                        <div className="flex flex-col items-center">
                          <div className="bg-slate-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow-md border border-slate-800 flex items-center">
                            <MapPin size={10} className="mr-1 text-danger fill-danger" /> Pin
                          </div>
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-0.5 border border-white" />
                        </div>
                      </motion.div>

                      {/* Map controls bottom overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <Button 
                          type="button" 
                          size="sm" 
                          onClick={triggerGPS}
                          className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm"
                        >
                          <MapPin size={12} className="mr-1.5 text-primary fill-primary" /> Auto Detect GPS
                        </Button>
                        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-300">
                          Lat: {formValues.coordinates.lat.toFixed(4)}, Lng: {formValues.coordinates.lng.toFixed(4)}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* STEP 5: REVIEW / AI PREVIEW */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <Card className="p-6 bg-white border border-slate-100 shadow-premium space-y-6">
                    <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-secondary">Step 5: Review & AI Priority Insights</h4>
                      <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">AI Evaluated</span>
                    </div>

                    {/* Layout split: Details review vs Gemini AI Priority preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      
                      {/* Left: citizen inputs review details */}
                      <div className="space-y-4">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-1 border-b border-slate-100">
                          Citizen Entry Details
                        </h5>
                        <div className="space-y-3.5 text-xs text-slate-600">
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400">Title:</span>
                            <span className="font-bold text-secondary text-sm">{formValues.title}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400">Category:</span>
                            <span className="font-semibold text-secondary">{formValues.category}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-slate-400">Target Address:</span>
                            <span className="font-medium text-slate-600 leading-normal">{formValues.address}</span>
                          </div>
                          {formValues.imageFiles.length > 0 && (
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 mb-1">Attached Media:</span>
                              <span className="font-semibold text-secondary">{formValues.imageFiles.length} Image(s) Attached</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Gemini AI Priority engine analysis preview */}
                      <div className="p-5 bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-large space-y-4 shadow-lg border border-slate-800">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider inline-flex items-center">
                            <Sparkles size={12} className="mr-1.5 text-accent" /> Gemini analysis
                          </span>
                          <span className="text-[9px] bg-accent/20 text-teal-400 border border-teal-400/25 px-2 py-0.5 rounded-full font-bold">Priority Engine</span>
                        </div>

                        {/* Calculated AI stats */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Estimated Priority:</span>
                            <span className="text-xs font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded">High (92/100)</span>
                          </div>
                          
                          <div className="space-y-1 pt-1">
                            <span className="block text-[10px] text-slate-400">Gemini Extracted Summary:</span>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                              "{formValues.description.slice(0, 80)}... requires immediate repair dispatch."
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-2 border-t border-slate-800">
                            <span className="block text-[10px] text-slate-400">Duplicate Check:</span>
                            <div className="flex items-center text-xs text-emerald-400 font-medium">
                              <CheckCircle2 size={12} className="mr-1.5" /> No duplicate complaints detected in Sector 4 registry.
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION NAV BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}
              >
                <ArrowLeft size={14} className="mr-2" /> Back
              </Button>

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                >
                  Continue <ArrowRight size={14} className="ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="success"
                  isLoading={isSubmitting}
                  className="shadow-lg shadow-success/15"
                >
                  Submit Complaint <CheckCircle2 size={14} className="ml-2" />
                </Button>
              )}
            </div>

          </form>
        )}

      </div>
    </DashboardLayout>
  );
};

export default SubmitComplaintPage;
