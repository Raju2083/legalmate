import React, { useState, useRef, useEffect } from 'react';
import { LegalMateLogo, ThreeDotsIcon } from './Icons';
import DropdownMenu from './DropdownMenu';

interface HeaderProps {
  language: string;
  setLanguage: (language: string) => void;
  onBookAppointment: () => void;
  onPrepareBailDocument: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onBookAppointment, onPrepareBailDocument }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="flex items-center">
        <LegalMateLogo className="w-10 h-10" />
        <div className="ml-2">
          <h1 className="text-lg font-bold text-blue-700">LegalMate</h1>
          <p className="text-sm text-blue-600">AI-powered law consultant</p>
        </div>
      </div>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Options menu"
        >
          <ThreeDotsIcon className="w-6 h-6" />
        </button>
        {isMenuOpen && (
          <DropdownMenu
            onClose={() => setIsMenuOpen(false)}
            currentLanguage={language}
            onSelectLanguage={setLanguage}
            onBookAppointment={onBookAppointment}
            onPrepareBailDocument={onPrepareBailDocument}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
