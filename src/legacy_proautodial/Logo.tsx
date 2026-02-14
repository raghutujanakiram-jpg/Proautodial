
import React, { useState, useEffect } from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'full';
  suffix?: string;
  withBackground?: boolean;
  imageUrl?: string;
  altText?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className = "", 
  showText = true,
  suffix = "",
  withBackground = false,
  imageUrl,
  altText = 'Company Logo',
  variant = 'full'
}) => {
  const iconSizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-48 h-48',
    xl: 'w-16 h-16',
    xxl: 'w-20 h-20',
  };

  const textSizeClasses = {
    xs: 'text-sm',
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-7xl',
    xl: 'text-4xl',
    xxl: 'text-5xl',
  };

  const [candidates, setCandidates] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const baseList: string[] = [];
    if (imageUrl) baseList.push(imageUrl);
    if (variant === 'dark') baseList.push('/logo-dark.svg', '/logo-dark.png', '/logo-dark.jpg', '/logo-dark.jpeg');
    if (variant === 'light') baseList.push('/logo-light.svg', '/logo-light.png', '/logo-light.jpg', '/logo-light.jpeg');
    baseList.push('/logo.svg', '/logo.png', '/logo.jpg', '/logo.jpeg');
    // De-duplicate while preserving order
    const unique = Array.from(new Set(baseList));
    setCandidates(unique);
  }, [imageUrl, variant]);

  const handleError = () => {
    setIdx((prev) => Math.min(prev + 1, candidates.length));
  };

  return (
    <div className={`flex items-center gap-3 ${className} select-none`}>
      <div className={`relative flex items-center justify-center transition-transform duration-300 ${iconSizeClasses[size]} ${withBackground ? 'bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-2' : ''}`}>
        {idx < candidates.length ? (
          <img
            src={candidates[idx]}
            alt={altText}
            className="w-full h-full object-contain"
            onError={handleError}
          />
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M50 12C28.46 12 11 27.82 11 47.33C11 58.55 16.65 68.42 25.5 74.5L24 88L41 81.5C43.83 82.17 46.83 82.67 50 82.67C71.54 82.67 89 66.85 89 47.33C89 27.82 71.54 12 50 12Z" 
              fill="#DB5D43" 
            />
            <path 
              d="M48 30C41 30 36 35 36 43C36 54 50 63 53 66" 
              stroke="white" 
              strokeWidth="7" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <circle cx="53" cy="46" r="5" fill="white" />
            <circle cx="70" cy="54" r="5" fill="white" />
            <line x1="53" y1="46" x2="70" y2="54" stroke="white" strokeWidth="6" strokeLinecap="round" />
          </svg>
        )}
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center -space-y-1">
          <div className="flex items-center">
            <span className={`${textSizeClasses[size]} font-bold text-[#DB5D43] tracking-tighter leading-none transition-colors duration-300`}>
              ProAutoDial
            </span>
            {suffix && (
              <span className={`${textSizeClasses[size]} font-black text-slate-800 dark:text-white italic ml-2 leading-none`}>
                {suffix}
              </span>
            )}
          </div>
          {size === 'lg' && (
            <span className="text-[14px] font-bold uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 ml-1.5 mt-2 transition-colors duration-300">
              Enterprise Communication
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
