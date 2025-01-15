import React, { useState } from 'react';
import { useTheme } from '@sprint-app/shared/react/hooks/index';
import TabNavigation from './components/TabNavigation/TabNavigation';
import InputSection from './components/InputSection/InputSection';
import PreviousChats from './components/PreviousChats/PreviousChats';

// Mock data for initial state
const INITIAL_TABS = [
  { id: 'chat', label: 'CHAT', icon: 'comment-discussion' },
  { id: 'composer', label: 'COMPOSER', icon: 'edit' },
  { id: 'bug-finder', label: 'BUG FINDER', icon: 'bug' },
];

const INITIAL_CHATS = [
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

function App() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('chat');
  const [chats, setChats] = useState(INITIAL_CHATS);

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      background: theme.background,
      color: theme.foreground,
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      background: theme.background,
      borderTop: `1px solid ${theme.secondary}`,
      borderBottom: `1px solid ${theme.secondary}`,
    },
  };

  const handleSubmit = (message: string) => {
    // Add new chat to the list
    const newChat = {
      id: Date.now().toString(),
      title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
      timestamp: 'Just now',
      icon: 'comment-discussion',
    };
    setChats([newChat, ...chats]);
  };

  const handleAddContext = () => {
    // Implement context addition logic
    console.log('Adding context...');
  };

  const handleCodebaseClick = () => {
    // Implement codebase navigation logic
    console.log('Opening codebase...');
  };

  const handleChatSelect = (chatId: string) => {
    // Implement chat selection logic
    console.log('Selected chat:', chatId);
  };

  const handleViewAll = () => {
    // Implement view all chats logic
    console.log('Viewing all chats...');
  };

  return (
    <div style={styles.container}>
      <TabNavigation
        tabs={INITIAL_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div style={styles.content}>
        <PreviousChats
          chats={chats}
          onChatSelect={handleChatSelect}
          onViewAll={handleViewAll}
        />
      </div>
      <InputSection
        onSubmit={handleSubmit}
        onAddContext={handleAddContext}
        onCodebaseClick={handleCodebaseClick}
      />
    </div>
  );
}

export default App;
