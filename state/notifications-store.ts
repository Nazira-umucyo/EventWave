import { createStore } from './create-store';
import { notifications as initialNotifications } from '@/data/notifications';
import type { NotificationItem } from '@/data/types';

const store = createStore<NotificationItem[]>(initialNotifications);

export const notificationsStore = {
  ...store,
  respond: (id: string) =>
    store.set((prev) => prev.filter((n) => n.id !== id)),
  markAllRead: () => store.set((prev) => prev.map((n) => ({ ...n, isNew: false }))),
};

export const useNotifications = store.useStore;
