import React from 'react';

// Mock VSCode components
export const VSCodeButton: React.FC<any> = ({ children, onClick, ...props }) => (
  <button onClick={onClick} {...props}>
    {children}
  </button>
);

export const VSCodeTextField: React.FC<any> = ({ value, onChange, placeholder, ...props }) => (
  <input
    type="text"
    value={value}
    onChange={(e: any) => onChange?.(e)}
    placeholder={placeholder}
    {...props}
  />
);

export const VSCodeProgressRing: React.FC<any> = (props) => (
  <div role="progressbar" {...props} />
);
