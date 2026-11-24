import React from 'react';
import { X, CheckCheck, Trash2, Bell, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markAllAsRead, clearAll, markAsRead } = useNotificationStore();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'order_fill':
        return <CheckCircle2 className="w-4 h-4 text-gada-up" />;
      case 'order_cancel':
        return <AlertCircle className="w-4 h-4 text-gada-down" />;
      default:
        return <Info className="w-4 h-4 text-gada-magenta" />;
    }
  };

  const formatTime = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(ts).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-gada-surface border-l border-gada-border shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gada-border flex items-center justify-between bg-gada-elevated/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gada-violet/20 text-gada-magenta border border-gada-violet/30">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">Notifications</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gada-elevated text-gada-muted border border-gada-border">
                {notifications.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gada-muted hover:text-white hover:bg-gada-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="px-6 py-2.5 border-b border-gada-border bg-gada-midnight/60 flex items-center justify-between text-xs">
            <button
              onClick={markAllAsRead}
              className="text-gada-muted hover:text-gada-magenta flex items-center gap-1.5 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button
              onClick={clearAll}
              className="text-gada-muted hover:text-gada-down flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear all
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gada-border/60 p-2">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-gada-muted">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-30 text-gada-violet" />
                <p className="text-sm">No notifications yet</p>
                <p className="text-xs text-gada-subtle mt-1">Simulated order events will appear here</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 rounded-xl transition-all cursor-pointer ${
                    notif.read ? 'bg-transparent hover:bg-gada-elevated/30 opacity-70' : 'bg-gada-elevated/60 hover:bg-gada-elevated border-l-2 border-gada-magenta'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notif.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white truncate">{notif.title}</h4>
                        <span className="text-[10px] text-gada-subtle whitespace-nowrap">{formatTime(notif.timestamp)}</span>
                      </div>
                      <p className="text-xs text-gada-muted mt-1 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
