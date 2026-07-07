import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  onClick,
  ...props
}) => {
  const Component = onClick ? motion.div : 'div';
  
  const baseClasses = `
    rounded-large 
    ${glass ? 'glass-panel' : 'bg-white border border-slate-100 shadow-premium'} 
    ${onClick ? 'cursor-pointer select-none' : ''}
    transition-all duration-300
    ${className}
  `;

  const motionProps = onClick
    ? {
        onClick,
        whileHover: hoverEffect ? { scale: 1.01, boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.08)' } : { y: -2 },
        whileTap: { scale: 0.99 },
        ...props
      }
    : props;

  return (
    <Component className={baseClasses} {...motionProps}>
      {children}
    </Component>
  );
};

export default Card;
