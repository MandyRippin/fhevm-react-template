import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  padding = 'md',
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg ${paddingStyles[padding]} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          )}
          {subtitle && (
            <p className="text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
