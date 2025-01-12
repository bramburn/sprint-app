# **Implementing Sprint AI Settings Using Fast v2 for React**

This guide walks you through implementing the **Sprint AI Settings** page using **Fast v2** for React. The page will have four tabs:
1. **Debug Page**: Displays different typography styles.
2. **Field Forms**: Showcases various input fields.
3. **Accordion and Tabs**: Includes collapsible sections and tabbed navigation.
4. **Messaging Interface**: A chat-like interface for sending and displaying messages.

We will follow the provided directory structure to ensure scalability and maintainability.

---

## **Directory Structure**

```
webview-settings/
├── src/
│   ├── components/
│   │   ├── common/                  # Common reusable components
│   │   │   ├── Button.tsx
│   │   │   ├── InputField.tsx
│   │   │   └── Typography.tsx
│   │   ├── debug/                   # Debug tab components
│   │   │   └── DebugPage.tsx
│   │   ├── forms/                   # Field forms tab components
│   │   │   └── FormsPage.tsx
│   │   ├── layout/                  # Layout components (e.g., accordion, tabs)
│   │   │   ├── Accordion.tsx
│   │   │   ├── Tabs.tsx
│   │   │   └── TabsPage.tsx
│   │   ├── messaging/               # Messaging tab components
│   │   │   ├── ChatPage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── Message.tsx
│   ├── context/                     # Context providers for state management
│   │   └── VSCodeContext.tsx        # VS Code API context provider
│   ├── App.tsx                      # Main application component
│   ├── index.tsx                    # Entry point for the application
│   └── index.css                    # Global styles
├── public/
│    └── index.html                  # Main HTML file for Vite
├── package.json                     # Project metadata and dependencies
└── tsconfig.json                    # TypeScript configuration
```

---

## **Implementation**

### **1. Setting Up Tab Navigation**

#### File: `components/common/Tabs.tsx`
A reusable tab navigation component.

```tsx
import React from 'react';

interface Tab {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 ${
            tab.isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={tab.onClick}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
```

---

### **2. Debug Page (Typography Showcase)**

#### File: `components/debug/DebugPage.tsx`
Displays various typography styles.

```tsx
import React from 'react';

const DebugPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">H1 - Bold</h1>
      <h2 className="text-3xl font-semibold">H2 - Semi-Bold</h2>
      <h3 className="text-2xl font-medium">H3 - Medium</h3>
      <p className="text-lg">This is a paragraph with normal text.</p>
      <small className="text-sm text-gray-500">This is small text.</small>
    </div>
  );
};

export default DebugPage;
```

---

### **3. Field Forms Page**

#### File: `components/forms/FormsPage.tsx`
Showcases various input fields.

```tsx
import React from 'react';
import InputField from '../common/InputField';

const FormsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Field Forms</h2>
      <InputField label="Username" placeholder="Enter your username" />
      <InputField label="Email" placeholder="Enter your email" type="email" />
      <InputField label="Password" placeholder="Enter your password" type="password" />
    </div>
  );
};

export default FormsPage;
```

#### File: `components/common/InputField.tsx`
Reusable input field component.

```tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, type = 'text' }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
};

export default InputField;
```

---

### **4. Accordion and Tabs Page**

#### File: `components/layout/TabsPage.tsx`
Includes an accordion and tabs.

```tsx
import React from 'react';
import Accordion from './Accordion';

const TabsPage: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Accordion and Tabs</h2>
      <Accordion title="Section 1">
        <p>This is the content of Section 1.</p>
      </Accordion>
      <Accordion title="Section 2">
        <p>This is the content of Section 2.</p>
      </Accordion>
    </div>
  );
};

export default TabsPage;
```

#### File: `components/layout/Accordion.tsx`
Reusable accordion component.

```tsx
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-gray-200"
      >
        {title}
      </button>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export default Accordion;
```

---

### **5. Messaging Interface**

#### File: `components/messaging/ChatPage.tsx`
A simple messaging interface.

```tsx
import React, { useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Messaging Interface</h2>
      <div className="mb-4 border rounded p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} text={msg} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;
```

#### File: `components/messaging/ChatInput.tsx`
Input field for sending messages.

```tsx
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-grow px-3 py-2 border rounded"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
```

---

### **6. Main Application**

#### File: `App.tsx`
Combines all tabs into a single application with navigation.

```tsx
import React, { useState } from 'react';
import Tabs from './components/common/Tabs';
import DebugPage from './components/debug/DebugPage';
import FormsPage from './components/forms/FormsPage';
import TabsPage from './components/layout/TabsPage';
import ChatPage from './components/messaging/ChatPage';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Debug', component: <DebugPage /> },
    { label: 'Forms', component: <FormsPage /> },
    { label: 'Layout', component: <TabsPage /> },
    { label: 'Messaging', component: <ChatPage /> },
  ];

  return (
    <>
      <Tabs tabs={tabs.map((tab, index) => ({
        label: tab.label,
        isActive: activeTab === index,
        onClick: () => setActiveTab(index),
      }))} />
      {tabs[activeTab].component}
    </>
  );
};

export default App;
```

---

## **Conclusion**

This implementation provides a modular structure for building the Sprint AI Settings page using Fast v2 and React. Each tab is implemented as a standalone component with reusable sub-components for scalability and maintainability. By following this guide, you can easily extend or modify the functionality as needed!

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/35208055/61f8988f-9a64-433d-b89c-3e4c0699f2e3/package.json
[2] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/35208055/4dbda9ce-6e13-4403-a233-3d07c3d94aef/App.tsx
[3] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/35208055/29b41636-4e66-4d2e-a3c0-6cf4c16b157c/vscode-api.ts