import React from 'react';
import './Icon.css';

type IconProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xlg';
};

const Icon: React.FC<IconProps> = ({ name, size = 'md' }) => {
  const sizeClass = `icon-${size}`;
  return (
    <span className={`icon ${sizeClass}`} aria-hidden="true">
      {/* Inline SVG for demonstration; replace with your sprite or icon set */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" fill="currentColor" />
      </svg>
    </span>
  );
};

export default Icon; 