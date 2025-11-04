import React from 'react';

interface QuickActionsProps {
  actions: string[];
  onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick }) => {
  return (
    <div className="bg-slate-100 px-4 pt-2 pb-1 overflow-x-auto">
      <div className="flex items-center space-x-2 whitespace-nowrap">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action)}
            className="px-3 py-1.5 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;