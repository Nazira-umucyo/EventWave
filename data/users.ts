import { Images } from '@/constants/images';
import type { EventUser } from './types';

export const currentUser: EventUser = {
  id: 'u-current',
  name: 'MD Rafi Islam',
  avatar: Images.avatarCurrentUser,
  followers: 1089,
  following: 275,
  eventsCount: 10,
  about:
    'Pellentesque mattis scelerisque aliquam tincidunt lacus. Convallis aliquam tortor at tincidunt cras fringilla aliquet amet. Mauris tempus ultrices fermentum aliquet.',
};

export const users: EventUser[] = [
  currentUser,
  { id: 'u-alex', name: 'Alex Lee', avatar: Images.avatarAlexLee, followers: 2000, following: 120, eventsCount: 4 },
  { id: 'u-micheal', name: 'Micheal Ullasi', avatar: Images.avatarMichealUllasi, followers: 56, following: 40, eventsCount: 2 },
  { id: 'u-david', name: 'David Silbia', avatar: Images.avatarDavidSilbia, followers: 54, following: 30, eventsCount: 1 },
  { id: 'u-ashfak', name: 'Ashfak Sayem', avatar: Images.avatarAshfakSayem, followers: 402, following: 90, eventsCount: 6 },
  { id: 'u-rocks', name: 'Rocks Velkeinjen', avatar: Images.avatarRocksVelkeinjen, followers: 893, following: 210, eventsCount: 8 },
  { id: 'u-roman', name: 'Roman Kutepov', avatar: Images.avatarRomanKutepov, followers: 225, following: 60, eventsCount: 3 },
  { id: 'u-cristofer', name: 'Cristofer Nolan', avatar: Images.avatarCristoferNolan, followers: 322, following: 80, eventsCount: 5 },
  { id: 'u-jhon', name: 'Jhon Wick', avatar: Images.avatarJhonWick, followers: 2000, following: 50, eventsCount: 2 },
  { id: 'u-zenifero', name: 'Zenifero Bolex', avatar: Images.avatarZeniferoBolex, followers: 3000, following: 140, eventsCount: 7 },
  {
    id: 'u-tamim',
    name: 'Tamim Ikram',
    avatar: Images.avatarOrganizerTamim,
    followers: 3583,
    following: 167,
    eventsCount: 20,
    isOrganizer: true,
    about:
      'Utricies arcu venenatis in lorem faucibus lobortis at. East odio varius nisl congue aliquam nunc est sit pull convallis magna. Est scelerisque dignissim non nibh arcu venenatis in lorem faucibus lobortis at. East odio...',
  },
];

export const getUserById = (id: string | undefined) => users.find((u) => u.id === id);

export const friendsList = users.filter((u) => u.id !== currentUser.id);
