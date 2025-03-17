// AccessibleIcon component for Speech Therapy Companion

import React from 'react';
import { useAccessibility } from '../lib/hooks';

interface AccessibleIconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  label: string;
  className?: string;
}

const AccessibleIcon: React.FC<AccessibleIconProps> = ({
  name,
  size = 'medium',
  color,
  label,
  className = '',
}) => {
  const { textSize, highContrast } = useAccessibility();
  
  // Size mapping based on accessibility settings
  const sizeMap = {
    standard: {
      small: 'w-4 h-4',
      medium: 'w-6 h-6',
      large: 'w-8 h-8',
    },
    large: {
      small: 'w-5 h-5',
      medium: 'w-7 h-7',
      large: 'w-9 h-9',
    },
    extra_large: {
      small: 'w-6 h-6',
      medium: 'w-8 h-8',
      large: 'w-10 h-10',
    },
  };
  
  // Determine size class based on accessibility settings
  const sizeClass = sizeMap[textSize][size];
  
  // Determine color class based on high contrast setting
  const colorClass = highContrast 
    ? 'text-black dark:text-white' 
    : color ? `text-${color}` : '';
  
  // Combine all classes
  const combinedClassName = `${sizeClass} ${colorClass} ${className}`;
  
  // Map icon name to SVG content
  const getIconSvg = () => {
    switch (name) {
      case 'play':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M8 5v14l11-7z" />
          </svg>
        );
      case 'pause':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        );
      case 'stop':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M6 6h12v12H6z" />
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
        );
      case 'dragon':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9c.83 0 1.5-.67 1.5-1.5S7.83 8 7 8s-1.5.67-1.5 1.5S6.17 11 7 11zm5-3c.83 0 1.5-.67 1.5-1.5S12.83 5 12 5s-1.5.67-1.5 1.5S11.17 8 12 8zm5 3c.83 0 1.5-.67 1.5-1.5S17.83 8 17 8s-1.5.67-1.5 1.5S16.17 11 17 11zm-8 4c0 1.1.9 2 2 2s2-.9 2-2h-4z" />
          </svg>
        );
      case 'reward':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
        );
      case 'timer':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={combinedClassName}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        );
    }
  };
  
  return (
    <div className="inline-flex" role="img" aria-label={label}>
      {getIconSvg()}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default AccessibleIcon;
