import React, { useState } from 'react';
import Chat from './Chat';
import './ChatContainer.css';

interface ChatContainerProps {
  name: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ name }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`chat-container-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <button className="chat-toggle" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '▼' : '▲'} Chat with {name}
      </button>
      {isExpanded && (
        <div className="chat-content">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default ChatContainer; 