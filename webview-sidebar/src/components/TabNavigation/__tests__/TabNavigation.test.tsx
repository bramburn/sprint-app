import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TabNavigation from '../TabNavigation';
import { ThemeProvider } from '@sprint-app/shared/react/hooks/index';

const mockTabs = [
  { id: 'chat', label: 'CHAT', icon: 'comment-discussion' },
  { id: 'composer', label: 'COMPOSER', icon: 'edit' },
  { id: 'bug-finder', label: 'BUG FINDER', icon: 'bug' },
];

describe('TabNavigation', () => {
  it('renders all tabs', () => {
    render(
      <ThemeProvider>
        <TabNavigation
          tabs={mockTabs}
          activeTab="chat"
          onTabChange={() => {}}
        />
      </ThemeProvider>
    );

    mockTabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('highlights active tab', () => {
    render(
      <ThemeProvider>
        <TabNavigation
          tabs={mockTabs}
          activeTab="chat"
          onTabChange={() => {}}
        />
      </ThemeProvider>
    );

    const activeTab = screen.getByText('CHAT');
    expect(activeTab.closest('button')).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onTabChange when clicking a tab', () => {
    const handleTabChange = vi.fn();
    render(
      <ThemeProvider>
        <TabNavigation
          tabs={mockTabs}
          activeTab="chat"
          onTabChange={handleTabChange}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('COMPOSER'));
    expect(handleTabChange).toHaveBeenCalledWith('composer');
  });

  it('renders action buttons', () => {
    render(
      <ThemeProvider>
        <TabNavigation
          tabs={mockTabs}
          activeTab="chat"
          onTabChange={() => {}}
        />
      </ThemeProvider>
    );

    expect(screen.getByLabelText('New chat')).toBeInTheDocument();
    expect(screen.getByLabelText('More options')).toBeInTheDocument();
  });
}); 