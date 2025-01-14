import React from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/useTheme';

export interface SidebarItemProps {
  label: string;
  id: string;
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  label, 
  id, 
  icon, 
  isActive, 
  onClick 
}) => {
  const { theme } = useTheme();

  return (
    <button
      role="menuitem"
      aria-current={isActive ? 'page' : undefined}
      className={`
        sidebar-item 
        flex items-center 
        w-full 
        p-2 
        rounded 
        transition-colors 
        duration-200 
        ${isActive 
          ? 'bg-[var(--vscode-list-activeSelectionBackground)] text-[var(--vscode-list-activeSelectionForeground)]' 
          : 'hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]'
        }
      `}
      onClick={onClick}
    >
      {icon && (
        <span 
          className="sidebar-item-icon mr-2 flex items-center justify-center"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="sidebar-item-label">{label}</span>
    </button>
  );
};

export default SidebarItem;
