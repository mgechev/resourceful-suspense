import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { useCart } from '../../context/CartContext';
import { useProductsStore } from '../../stores/productsStore';
import { chatService } from '../../services/chatService';
import styles from './Chat.module.css';

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
  const { getAllProducts, setProducts } = useProductsStore();

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
    setMessages((prev) => [...prev, { text: userMessage, by: 'user' }]);
    setIsLoading(true);

    try {
      const data = await chatService.sendMessage(userMessage);
      setMessages((prev) => [...prev, { text: data.message, by: 'bot' }]);

      if (!data.action || data.action.type !== 'addToCart') {
        return;
      }

      let allProducts = getAllProducts();
      if (!Object.keys(allProducts).length) {
        const products = await chatService.fetchProducts();
        const productsPerCategory = chatService.groupProductsByCategory(products);
        
        for (const [categoryId, products] of Object.entries(productsPerCategory)) {
          setProducts(categoryId, products);
        }
        allProducts = getAllProducts();
      }

      const product = Object.values(allProducts).flat().find(p => p.id === data.action?.params.id);
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
      sendMessage();
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
          onClick={sendMessage} 
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