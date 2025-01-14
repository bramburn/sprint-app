import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the useTheme hook
vi.mock('@sprint-app/shared/react/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
      },
    },
  }),
}));

describe('App Component', () => {
  it('renders the header with correct title', () => {
    render(<App />);
    expect(screen.getByText('Cursor Settings')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<App />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Models')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('shows beta settings by default', () => {
    render(<App />);
    expect(screen.getByText('Beta Features')).toBeInTheDocument();
    expect(screen.getByText('Notepads')).toBeInTheDocument();
    expect(screen.getByText('Bug Finder')).toBeInTheDocument();
  });

  it('switches content when clicking navigation items', () => {
    render(<App />);
    
    // Click on General tab
    fireEvent.click(screen.getByText('General'));
    expect(screen.getByText('General Settings')).toBeInTheDocument();

    // Click on Models tab
    fireEvent.click(screen.getByText('Models'));
    expect(screen.getByText('Model Control Panel')).toBeInTheDocument();

    // Click on Features tab
    fireEvent.click(screen.getByText('Features'));
    expect(screen.getByText('Feature Settings')).toBeInTheDocument();
  });

  it('toggles settings when clicking checkboxes', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<App />);

    // Find and click the Notepads checkbox
    const notepadCheckbox = screen.getByLabelText('Toggle Notepads');
    fireEvent.click(notepadCheckbox);
    expect(consoleSpy).toHaveBeenCalledWith('Toggled setting: Notepads');

    // Find and click the Bug Finder checkbox
    const bugFinderCheckbox = screen.getByLabelText('Toggle Bug Finder');
    fireEvent.click(bugFinderCheckbox);
    expect(consoleSpy).toHaveBeenCalledWith('Toggled setting: Bug Finder');
  });

  it('renders ModelSection when Models tab is selected', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Models'));
    
    expect(screen.getByText('Model Control Panel')).toBeInTheDocument();
    expect(screen.getByText(/This is a placeholder/)).toBeInTheDocument();
  });
});
