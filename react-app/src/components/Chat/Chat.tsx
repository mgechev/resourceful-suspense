import React, { useState, useRef, useEffect, use } from 'react';
import { marked } from 'marked';
import { useCart } from '../../context/CartContext';
import styles from './Chat.module.css';

import { useGetProduct, useSendMessage } from '../../services/async-state';
interface ChatMessage {
  text: string;
  by: 'user' | 'bot';
}

let dataPromise: null | Promise<string> = null;

const getConfig = async () => {
  if (!dataPromise) {
    dataPromise = fetch('/api/user')
      .then((response) => response.json())
      .then((data) => data.name);
  }
  return dataPromise;
}

const Chat: React.FC = () => {
  const name = use(getConfig());
  const sendMessage = useSendMessage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const getProduct = useGetProduct();
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, by: 'user' }]);
    setIsLoading(true);

    try {
      const data = await sendMessage(userMessage, name);
      setMessages((prev) => [...prev, { text: data.message, by: 'bot' }]);

      if (!data.action || data.action.type !== 'addToCart') {
        return;
      }

      const product = await getProduct(data.action.params.id);
      if (!product) {
        return;
      }

      addToCart({...product, quantity: data.action.params.quantity});
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, I encountered an error.', by: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatContent}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${styles.message} ${message.by === 'user' ? styles.userMessage : styles.botMessage}`}
            >
              <div 
                className={styles.messageContent}
                dangerouslySetInnerHTML={{ __html: marked.parse(message.text) as string }} 
              />
            </div>
          ))}
          {isLoading && (
            <div className={styles.typingIndicator}>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
              <div className={styles.typingDot}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={styles.inputArea}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={styles.input}
          rows={1}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={isLoading || !input.trim()}
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;