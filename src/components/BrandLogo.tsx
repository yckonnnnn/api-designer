import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'transparent';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
}) => {
  // Balanced padding & negative space (留白) around the iconic intelligent dispatch mascot
  const sizeClasses = {
    sm: 'w-7 h-7 p-1 rounded-lg',
    md: 'w-8 h-8 p-1.5 rounded-xl',
    lg: 'w-10 h-10 p-2 rounded-2xl',
    xl: 'w-16 h-16 p-3 rounded-3xl',
  };

  const bgClasses = {
    dark: 'bg-neutral-900 border border-neutral-800 text-white shadow-xs hover:border-neutral-700',
    light: 'bg-neutral-100 border border-neutral-200/90 text-neutral-900 shadow-2xs hover:border-neutral-300',
    transparent: 'bg-transparent text-neutral-900',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-300 group-hover:scale-105 shrink-0 ${sizeClasses[size]} ${bgClasses[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-300 group-hover:-rotate-6"
      >
        <defs>
          {/* Subtle warm glow or solid fill depending on theme */}
          <linearGradient id="agentMascotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={variant === 'light' ? '#0f172a' : '#ffffff'} />
            <stop offset="100%" stopColor={variant === 'light' ? '#1e293b' : '#f8fafc'} />
          </linearGradient>
        </defs>

        {/* 
          Smart Dispatch Mascot (智能调度 Logo)
          A pure, iconic circular AI Agent / Speech Silhouette with dual horizontal glowing eyes 
        */}
        <g transform="translate(0, 0)">
          {/* Main Bubble Head Silhouette */}
          <path
            d="M 50 14 
               C 28 14, 16 28, 16 48 
               C 16 58, 20 66, 28 72 
               L 22 84 
               C 21.2 85.6, 23 87, 24.5 86 
               L 36 78.5 
               C 40.5 80.5, 45 81.5, 50 81.5 
               C 72 81.5, 84 67.5, 84 48 
               C 84 28, 72 14, 50 14 
               Z"
            fill={variant === 'dark' ? '#ffffff' : '#111827'}
          />

          {/* Left Oval Glowing Eye */}
          <ellipse
            cx="39"
            cy="46"
            rx="5.5"
            ry="3.2"
            fill={variant === 'dark' ? '#111827' : '#ffffff'}
          />

          {/* Right Oval Glowing Eye */}
          <ellipse
            cx="61"
            cy="46"
            rx="5.5"
            ry="3.2"
            fill={variant === 'dark' ? '#111827' : '#ffffff'}
          />
        </g>
      </svg>
    </div>
  );
};
