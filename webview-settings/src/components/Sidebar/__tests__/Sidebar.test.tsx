import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../index';
import { ThemeProvider } from '@sprint-app/shared/react/hooks/useTheme';

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
      <ThemeProvider>
        <Sidebar 
          items={mockItems} 
          activeTab={activeTab} 
          onTabChange={mockOnTabChange} 
        />
      </ThemeProvider>
    );
  };

  it('renders all sidebar items', () => {
    renderSidebar();

    mockItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
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
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../index';

describe('Sidebar Component', () => {
  const mockItems = [
    { 
      label: 'General', 
      id: 'general', 
      onClick: () => {} 
    },
    { 
      label: 'Models', 
      id: 'models', 
      onClick: () => {} 
    },
    { 
      label: 'Features', 
      id: 'features', 
      onClick: () => {} 
    }
  ];

  const mockOnTabChange = vi.fn();

  it('renders all sidebar items', () => {
    render(
      <Sidebar 
        items={mockItems} 
        activeTab="general" 
        onTabChange={mockOnTabChange} 
      />
    );

    mockItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it('highlights active tab', () => {
    render(
      <Sidebar 
        items={mockItems} 
        activeTab="models" 
        onTabChange={mockOnTabChange} 
      />
    );

    const modelsTab = screen.getByText('Models');
    expect(modelsTab.closest('li')).toHaveClass('active');
  });

  it('calls onTabChange when tab is clicked', () => {
    render(
      <Sidebar 
        items={mockItems} 
        activeTab="general" 
        onTabChange={mockOnTabChange} 
      />
    );

    const featuresTab = screen.getByText('Features');
    fireEvent.click(featuresTab);

    expect(mockOnTabChange).toHaveBeenCalledWith('features');
  });
});
