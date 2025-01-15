import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PreviousChats from '../PreviousChats';
import { ThemeProvider } from '@sprint-app/shared/react/hooks/index';

const mockChats = [
  {
    id: '1',
    title: 'Backlog Review: Sprint Planning',
    timestamp: '6m ago',
    icon: 'comment-discussion',
  },
  {
    id: '2',
    title: 'Using Theme Settings',
    timestamp: '1h ago',
    icon: 'comment-discussion',
  },
];

describe('PreviousChats', () => {
  const mockProps = {
    chats: mockChats,
    onChatSelect: vi.fn(),
    onViewAll: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header and view all button', () => {
    render(
      <ThemeProvider>
        <PreviousChats {...mockProps} />
      </ThemeProvider>
    );

    expect(screen.getByText('Previous chats')).toBeInTheDocument();
    expect(screen.getByText('View all')).toBeInTheDocument();
  });

  it('renders all chat items', () => {
    render(
      <ThemeProvider>
        <PreviousChats {...mockProps} />
      </ThemeProvider>
    );

    mockChats.forEach((chat) => {
      expect(screen.getByText(chat.title)).toBeInTheDocument();
      expect(screen.getByText(chat.timestamp)).toBeInTheDocument();
    });
  });

  it('calls onChatSelect when a chat item is clicked', () => {
    render(
      <ThemeProvider>
        <PreviousChats {...mockProps} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText(mockChats[0].title));
    expect(mockProps.onChatSelect).toHaveBeenCalledWith(mockChats[0].id);
  });

  it('calls onViewAll when View all button is clicked', () => {
    render(
      <ThemeProvider>
        <PreviousChats {...mockProps} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('View all'));
    expect(mockProps.onViewAll).toHaveBeenCalled();
  });

  it('renders chat items with icons', () => {
    render(
      <ThemeProvider>
        <PreviousChats {...mockProps} />
      </ThemeProvider>
    );

    const icons = screen.getAllByRole('button').map(
      (button) => button.querySelector('.codicon-comment-discussion')
    );
    expect(icons.filter(Boolean)).toHaveLength(mockChats.length);
  });

  
}); 