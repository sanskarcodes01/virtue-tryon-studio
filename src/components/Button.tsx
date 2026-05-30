import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-black text-white hover:bg-zinc-800',
    secondary: 'bg-brand-card text-black hover:bg-zinc-200 border border-black/5',
    outline: 'bg-transparent text-black border border-black hover:bg-black hover:text-white',
    ghost: 'bg-transparent text-zinc-600 hover:bg-black/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px] uppercase tracking-widest',
    md: 'px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold',
    lg: 'px-12 py-5 text-xs uppercase tracking-[0.2em] font-bold',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-4 transition-all duration-200 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </motion.button>
  );
}
