import React, { useRef, useEffect } from 'react';

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ input, setInput, onSendMessage, isLoading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to recalculate
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 128; // approx 6 lines
      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [input]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-slate-200">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 p-3 text-sm text-slate-700 bg-slate-100 rounded-lg border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none resize-none transition-colors"
          rows={1}
          style={{ overflowY: 'hidden', minHeight: '44px' }}
          disabled={isLoading}
        />
        <button
          onClick={onSendMessage}
          disabled={isLoading || input.trim() === ''}
          className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;