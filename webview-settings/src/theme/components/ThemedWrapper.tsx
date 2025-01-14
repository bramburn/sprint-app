import React, { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import { applyThemeStyles, getThemedClassName } from '../utils/componentThemeIntegration';

interface ThemedWrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tagName?: keyof JSX.IntrinsicElements;
}

export const ThemedWrapper: React.FC<ThemedWrapperProps> = ({
  children,
  className = '',
  style = {},
  tagName: Tag = 'div'
}) => {
  const { theme } = useTheme();

  const themedStyle = applyThemeStyles(theme, style);
  const themedClassName = getThemedClassName(className);

  return (
    <Tag 
      className={themedClassName}
      style={themedStyle}
    >
      {children}
    </Tag>
  );
};
