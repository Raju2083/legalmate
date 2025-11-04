import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { Message, Sender } from './types';
import { sendMessageToGemini } from './services/geminiService';
import BookingModal from './components/BookingModal';
import BailDocumentModal from './components/BailDocumentModal';
import QuickActions from './components/QuickActions';

const LOCAL_STORAGE_KEY_MESSAGES = 'legalmate_messages';
const LOCAL_STORAGE_KEY_LANGUAGE = 'legalmate_language';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY_MESSAGES);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          return parsedMessages;
        }
      }
    } catch (error) {
      console.error("Failed to load messages from local storage", error);
    }
    return [
      {
        id: '2',
        text: 'Sure, I can assist you with that. Please provide more details about your property dispute, such as the location and the nature of the issue.',
        sender: Sender.Bot,
      },
    ];
  });

  const [language, setLanguage] = useState<string>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY_LANGUAGE) || 'en';
    } catch (error) {
      console.error("Failed to load language from local storage", error);
      return 'en';
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBailModalOpen, setIsBailModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to local storage", error);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LANGUAGE, language);
    } catch (error) {
      console.error("Failed to save language to local storage", error);
    }
  }, [language]);

  const handleSendMessage = async (messageOverride?: string) => {
    const textToSend = messageOverride || input;
    if (textToSend.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: Sender.User,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    if (!messageOverride) {
        setInput('');
    }
    
    setIsLoading(true);

    try {
      const botResponseText = await sendMessageToGemini(textToSend, language);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: Sender.Bot,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, something went wrong. Please try again.',
        sender: Sender.Bot,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    "How do I book an appointment?",
    "What are my rights in a property dispute?",
    "Explain the bail process.",
    "How to prepare a bail document?"
  ];

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-100 font-sans">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onBookAppointment={() => setIsBookingModalOpen(true)}
        onPrepareBailDocument={() => setIsBailModalOpen(true)}
      />
      <ChatWindow messages={messages} isLoading={isLoading} />
      {messages.length <= 1 && (
        <QuickActions 
          actions={quickActions}
          onActionClick={handleSendMessage}
        />
      )}
      <MessageInput
        input={input}
        setInput={setInput}
        onSendMessage={() => handleSendMessage()}
        isLoading={isLoading}
      />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
      <BailDocumentModal
        isOpen={isBailModalOpen}
        onClose={() => setIsBailModalOpen(false)}
      />
    </div>
  );
};

export default App;