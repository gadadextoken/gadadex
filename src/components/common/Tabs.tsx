import React from 'react';

interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pill';
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  size = 'md',
}) => {
  return (
    <div className={`flex items-center gap-1 ${variant === 'underline' ? 'border-b border-gada-border' : 'bg-gada-midnight/60 p-1 rounded-xl border border-gada-border'}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (variant === 'pill') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 rounded-lg font-medium transition-all ${
                size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-gada-violet to-gada-electric text-white shadow-glow-purple font-semibold'
                  : 'text-gada-muted hover:text-white hover:bg-gada-elevated/60'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-gada-border text-gada-muted'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative flex items-center gap-2 font-medium transition-colors ${
              size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
            } ${
              isActive
                ? 'text-white font-semibold'
                : 'text-gada-muted hover:text-white'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-gada-violet/20 text-gada-magenta' : 'bg-gada-elevated text-gada-muted'}`}>
                {tab.badge}
              </span>
            )}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gada-violet to-gada-magenta rounded-full shadow-glow-purple" />
            )}
          </button>
        );
      })}
    </div>
  );
};
