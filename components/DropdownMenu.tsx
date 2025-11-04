import React, { useState } from 'react';
import { LanguageIcon, CalendarIcon, DocumentIcon } from './Icons';
import { LANGUAGES } from '../types';

interface DropdownMenuProps {
    onClose: () => void;
    currentLanguage: string;
    onSelectLanguage: (languageCode: string) => void;
    onBookAppointment: () => void;
    onPrepareBailDocument: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onClose, currentLanguage, onSelectLanguage, onBookAppointment, onPrepareBailDocument }) => {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    
    const handleAppointmentClick = () => {
        onBookAppointment();
        onClose();
    };

    const handleBailDocumentClick = () => {
        onPrepareBailDocument();
        onClose();
    };

    const handleLanguageSelect = (langCode: string) => {
        onSelectLanguage(langCode);
        onClose();
    };

    if (showLanguageMenu) {
        return (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                <div className="py-1">
                    <button
                        onClick={() => setShowLanguageMenu(false)}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Back</span>
                    </button>
                    <div className="border-t border-slate-200 my-1"></div>
                    {Object.entries(LANGUAGES).map(([code, name]) => (
                        <button
                            key={code}
                            onClick={() => handleLanguageSelect(code)}
                            className={`w-full text-left flex items-center px-4 py-2 text-sm hover:bg-slate-100 ${
                                currentLanguage === code ? 'text-blue-600 font-semibold' : 'text-slate-700'
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1">
                <button
                    onClick={() => setShowLanguageMenu(true)}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                    <LanguageIcon className="w-5 h-5 mr-3 text-slate-500"/>
                    <span>Change Language</span>
                </button>
                <button
                    onClick={handleAppointmentClick}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                    <CalendarIcon className="w-5 h-5 mr-3 text-slate-500"/>
                    <span>Book Appointment</span>
                </button>
                <button
                    onClick={handleBailDocumentClick}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                    <DocumentIcon className="w-5 h-5 mr-3 text-slate-500"/>
                    <span>Prepare Bail Document</span>
                </button>
            </div>
        </div>
    );
};

export default DropdownMenu;