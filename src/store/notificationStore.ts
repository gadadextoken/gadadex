import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppNotification } from '../types/account';

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type?: AppNotification['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  getUnreadCount: () => number;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Welcome to GADADEX Simulation',
    message: 'Your simulated account has been credited with 10,000 virtual USDT and 100 GDT starter tokens.',
    type: 'system',
    timestamp: Date.now() - 3600000,
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Simulation Mode Active',
    message: 'All order executions and balances are virtual. No real funds are at risk.',
    type: 'system',
    timestamp: Date.now() - 7200000,
    read: true,
  },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: INITIAL_NOTIFICATIONS,

      addNotification: (title, message, type = 'system') => {
        const newNotif: AppNotification = {
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          title,
          message,
          type,
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications],
        }));
      },

      markAsRead: (id: string) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      },
    }),
    {
      name: 'gadadex-notifications-storage',
    }
  )
);
