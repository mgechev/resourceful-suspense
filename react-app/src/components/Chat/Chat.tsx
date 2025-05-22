import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import './Chat.css';
import { useCart } from '../../context/CartContext';

interface ChatMessage {
  text: string;
  by: 'user' | 'bot';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev: ChatMessage[]) => [...prev, { text: userMessage, by: 'user' }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4200/api/prompt?prompt=' + userMessage + '&tech=react&name=React');

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages((prev: ChatMessage[]) => [...prev, { text: data.message, by: 'bot' }]);
      if (data.action && data.action.type === 'addToCart') {
        for (let i = 0; i < data.action.params.quantity; i++) {
          addToCart(data.action.params.product);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev: ChatMessage[]) => [...prev, { text: 'Sorry, I encountered an error.', by: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message: ChatMessage, index: number) => (
          <div key={index} className={`message ${message.by}`}>
            <div 
              className="message-content" 
              dangerouslySetInnerHTML={{ __html: marked.parse(message.text) as string }} 
            />
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          rows={1}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;