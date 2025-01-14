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
