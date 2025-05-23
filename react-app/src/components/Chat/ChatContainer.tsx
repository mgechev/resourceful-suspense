import React, { Suspense, useState } from 'react';
import './ChatContainer.css';

interface ChatContainerProps {
  name: string;
}

const LazyChat = React.lazy(() => import('./Chat'));

const ChatContainer: React.FC<ChatContainerProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`chat-container-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <button className="chat-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="toggle-content">
          <span>Chat</span>
        </div>
        <span className="toggle-icon">▼</span>
      </button>
      {isExpanded && (
        <div className="chat-content">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyChat />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ChatContainer; 