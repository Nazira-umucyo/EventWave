import { createStore } from './create-store';

type InviteStatus = 'invite' | 'sent';

const inviteStore = createStore<Record<string, InviteStatus>>({});
const rawFollowStore = createStore<Set<string>>(new Set());

export const invitesStore = {
  ...inviteStore,
  send: (userId: string) => inviteStore.set((prev) => ({ ...prev, [userId]: 'sent' })),
  statusFor: (userId: string): InviteStatus => inviteStore.get()[userId] ?? 'invite',
};
export const useInvites = inviteStore.useStore;

export const followStore = {
  ...rawFollowStore,
  toggle: (userId: string) =>
    rawFollowStore.set((prev) => {
      const next = new Set(prev);
      next.has(userId) ? next.delete(userId) : next.add(userId);
      return next;
    }),
  isFollowing: (userId: string) => rawFollowStore.get().has(userId),
};
export const useFollowing = rawFollowStore.useStore;
