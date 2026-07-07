import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, accent, danger, success, ghost, outline
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-large transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none select-none";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover active:bg-blue-800",
    secondary: "bg-secondary text-white hover:bg-secondary-hover active:bg-slate-800",
    accent: "bg-accent text-white hover:bg-accent-hover active:bg-teal-700",
    success: "bg-success text-white hover:bg-emerald-600 active:bg-emerald-700 focus:ring-success/20",
    danger: "bg-danger text-white hover:bg-red-600 active:bg-red-700 focus:ring-danger/20",
    outline: "bg-transparent text-primary border border-primary hover:bg-primary/5 active:bg-primary/10",
    ghost: "bg-transparent text-secondary hover:bg-slate-100 active:bg-slate-200 dark:text-white dark:hover:bg-slate-800/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-semibold tracking-wide",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : children}
    </motion.button>
  );
};

export default Button;
