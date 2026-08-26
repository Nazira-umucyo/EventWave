import type { NotificationItem } from './types';

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'follow',
    fromUserId: 'u-micheal',
    message: 'started to following you',
    timeAgo: 'Just now',
    isNew: true,
  },
  {
    id: 'n2',
    type: 'invite',
    fromUserId: 'u-david',
    message: 'invite you on Dribbble Design meetup 2022',
    timeAgo: '1 min ago',
    isNew: true,
    requiresAction: true,
    eventId: 'e-dribbblers-meetup',
  },
  {
    id: 'n3',
    type: 'comment',
    fromUserId: 'u-micheal',
    message: 'commented on your SAAS mobile App...',
    timeAgo: '10 min ago',
  },
  {
    id: 'n4',
    type: 'invite',
    fromUserId: 'u-jhon',
    message: 'invite you on Basketball Final Match',
    timeAgo: '1 min ago',
    requiresAction: true,
    eventId: 'e-basketball-final',
  },
  {
    id: 'n5',
    type: 'like',
    fromUserId: 'u-roman',
    message: 'liked your SAAS mobile App design',
    timeAgo: '10 min ago',
  },
];

export const hasUnreadNotifications = notifications.some((n) => n.isNew);
