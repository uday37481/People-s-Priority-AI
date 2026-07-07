import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, User, Eye, EyeOff, ArrowLeft, 
  Landmark, ArrowRight, CheckCircle2, ShieldCheck, 
  Chrome, Sparkles 
} from 'lucide-react';
import Button from '../components/atoms/Button.jsx';
import Card from '../components/atoms/Card.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen', // 'citizen' | 'mp'
    rememberMe: false
  });

  // Validation State
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (authMode === 'register' && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (authMode !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API authentication call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleSuccessDone = () => {
    setIsSuccess(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans select-none">
      
      {/* SUCCESS STATE OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-slate-900 max-w-md w-full rounded-large border border-slate-100 dark:border-slate-800 p-8 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-success flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} className="stroke-[2.5]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Authentication Successful!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {authMode === 'login' 
                    ? "Welcome back to the portal. You have been successfully authenticated."
                    : authMode === 'register'
                    ? "Your government portal account has been successfully created."
                    : "Password reset instruction link has been sent to your registered email."
                  }
                </p>
              </div>

              <div className="pt-2">
                <Button size="lg" className="w-full shadow-lg shadow-primary/20" onClick={handleSuccessDone}>
                  {authMode === 'forgot' ? 'Return to Home' : 'Proceed to Dashboard'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDE: Government AI Illustration / Key Stats Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Vector Background Accents */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-[150px] pointer-events-none" />

        {/* Branding header */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-premium">
              <Landmark size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none">People's Priorities</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">Gov AI Portal</span>
            </div>
          </Link>
        </div>

        {/* Central Illustration Area */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300">
            <Sparkles size={14} className="text-accent" />
            <span>AI-Driven Constituency Insights</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Bridging the gap between Local Communities & Elected Leaders
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Log in to access your customized governance portal. Submit complaints with integrated media transcription, or evaluate constituency performance metrics using structured AI recommendation models.
            </p>
          </div>

          {/* Graphical Mock Grid Card (government theme representation) */}
          <div className="bg-slate-950/60 rounded-large border border-slate-800/80 p-5 space-y-4 shadow-xl">
            <div className="flex items-center space-x-3 text-slate-300">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider">Secured Government Portal</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 pt-1 border-t border-slate-900">
              <span>GDPR Compliant</span>
              <span>•</span>
              <span>AES-256 Encrypted</span>
              <span>•</span>
              <span>ISO 27001</span>
            </div>
          </div>
        </div>

        {/* Left Side Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} People's Priorities</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Centered Authentication Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
        
        {/* Floating background blur nodes */}
        <div className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

        {/* Back Link */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} className="mr-1.5" /> Back to home
        </Link>

        {/* GLASSMORPHISM CARD CONTAINING FORMS */}
        <div className="w-full max-w-md relative z-10">
          <Card className="glass-panel p-8 sm:p-10 shadow-2xl relative overflow-hidden rounded-large">
            
            {/* Header description */}
            <div className="text-center space-y-2 mb-8">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {authMode === 'login' && 'Sign in to Portal'}
                {authMode === 'register' && 'Create Portal Profile'}
                {authMode === 'forgot' && 'Reset your password'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {authMode === 'login' && 'Enter your details below to log in to your account'}
                {authMode === 'register' && 'Enter details below to create your official citizen/MP account'}
                {authMode === 'forgot' && 'Enter your email address and we will mail you reset guidelines'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field (Register Mode Only) */}
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                      disabled={isLoading}
                      className={`input-field pl-10 ${errors.name ? 'border-danger focus:ring-danger/10' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[11px] font-medium text-danger block mt-1">{errors.name}</span>
                  )}
                </div>
              )}

              {/* Email Address Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@gov.in"
                    disabled={isLoading}
                    className={`input-field pl-10 ${errors.email ? 'border-danger focus:ring-danger/10' : ''}`}
                  />
                </div>
                {errors.email && (
                  <span className="text-[11px] font-medium text-danger block mt-1">{errors.email}</span>
                )}
              </div>

              {/* Password Field (Login & Register Mode Only) */}
              {authMode !== 'forgot' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[11px] font-bold text-primary hover:text-primary-hover transition-colors"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className={`input-field pl-10 pr-10 ${errors.password ? 'border-danger focus:ring-danger/10' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-[11px] font-medium text-danger block mt-1">{errors.password}</span>
                  )}
                </div>
              )}

              {/* Role Selection (Register Mode Only) */}
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Account Category
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label 
                      className={`flex items-center justify-center p-3 rounded-large border cursor-pointer transition-all duration-200 select-none
                        ${formData.role === 'citizen' 
                          ? 'border-primary bg-primary/5 text-primary font-semibold' 
                          : 'border-[#E2E8F0] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="citizen"
                        checked={formData.role === 'citizen'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-xs">Citizen Account</span>
                    </label>

                    <label 
                      className={`flex items-center justify-center p-3 rounded-large border cursor-pointer transition-all duration-200 select-none
                        ${formData.role === 'mp' 
                          ? 'border-primary bg-primary/5 text-primary font-semibold' 
                          : 'border-[#E2E8F0] dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="mp"
                        checked={formData.role === 'mp'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-xs">MP Planner Account</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Remember Me checkbox (Login Mode Only) */}
              {authMode === 'login' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 transition-colors"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Keep me signed in on this device
                  </label>
                </div>
              )}

              {/* Loading Submit Button */}
              <div className="pt-2">
                <Button 
                  type="submit" 
                  isLoading={isLoading} 
                  className="w-full shadow-lg shadow-primary/10"
                >
                  {authMode === 'login' && 'Sign In'}
                  {authMode === 'register' && 'Register Account'}
                  {authMode === 'forgot' && 'Send Reset Guidelines'}
                </Button>
              </div>
            </form>

            {/* Social Logins Placeholder */}
            {authMode !== 'forgot' && (
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200/60 dark:border-slate-800" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white/70 dark:bg-slate-900 text-slate-500 font-bold uppercase tracking-wider">
                      Or Authenticate via
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center py-2.5 px-4 rounded-large border border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <Chrome size={14} className="mr-2 text-red-500" /> Google
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center py-2.5 px-4 rounded-large border border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <Landmark size={14} className="mr-2 text-primary" /> Gov Portal
                  </button>
                </div>
              </div>
            )}

            {/* Toggle State footers */}
            <div className="mt-8 text-center text-xs">
              {authMode === 'login' && (
                <p className="text-slate-500 dark:text-slate-400">
                  New to People's Priorities?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setErrors({});
                    }}
                    className="font-bold text-primary hover:text-primary-hover transition-colors"
                  >
                    Create account here
                  </button>
                </p>
              )}

              {authMode === 'register' && (
                <p className="text-slate-500 dark:text-slate-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setErrors({});
                    }}
                    className="font-bold text-primary hover:text-primary-hover transition-colors"
                  >
                    Sign in instead
                  </button>
                </p>
              )}

              {authMode === 'forgot' && (
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setErrors({});
                  }}
                  className="font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors flex items-center justify-center mx-auto"
                >
                  <ArrowLeft size={12} className="mr-1" /> Return to Login
                </button>
              )}
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
