import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import  Sidebar from '../index';
import { ThemeContext } from '@sprint-app/shared/react/hooks/useTheme';
import { createDefaultTheme } from '@sprint-app/shared/theme/types';

// Mock icon component
const MockIcon = () => <span data-testid="mock-icon">Icon</span>;

describe('Sidebar Component', () => {
  const mockItems = [
    { 
      label: 'General', 
      id: 'general', 
      icon: <MockIcon />,
      onClick: vi.fn() 
    },
    { 
      label: 'Models', 
      id: 'models', 
      icon: <MockIcon />,
      onClick: vi.fn() 
    },
    { 
      label: 'Features', 
      id: 'features', 
      icon: <MockIcon />,
      onClick: vi.fn() 
    }
  ];

  const mockOnTabChange = vi.fn();

  const renderSidebar = (activeTab = 'general') => {
    return render(
      <ThemeContext.Provider value={{ 
        theme: createDefaultTheme(), 
        updateTheme: () => {} 
      }}>
        <Sidebar 
          items={mockItems} 
          activeTab={activeTab} 
          onTabChange={mockOnTabChange} 
        />
      </ThemeContext.Provider>
    );
  };

  it('renders all sidebar items', () => {
    renderSidebar();

    mockItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getAllByTestId('mock-icon')).toHaveLength(mockItems.length);
    });
  });

  it('highlights active tab', () => {
    renderSidebar('models');

    const modelsTab = screen.getByText('Models');
    expect(modelsTab.closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onTabChange and item onClick when tab is clicked', () => {
    renderSidebar();

    const modelsTab = screen.getByText('Models');
    fireEvent.click(modelsTab);

    expect(mockOnTabChange).toHaveBeenCalledWith('models');
    expect(mockItems[1].onClick).toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    renderSidebar();

    const sidebarContainer = screen.getByRole('menu');
    expect(sidebarContainer).toBeInTheDocument();

    const sidebarItems = screen.getAllByRole('menuitem');
    expect(sidebarItems).toHaveLength(mockItems.length);
  });
});
