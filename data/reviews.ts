import type { Review } from './types';

export const reviews: Review[] = [
  {
    id: 'r1',
    authorId: 'u-micheal',
    rating: 5,
    comment:
      'Elementum convallis praesent scelerisque fringilla at fermentum, fames. Nunc metus, mattis non ac. Quis convallis fringilla.',
    date: '2022-09-17',
  },
  {
    id: 'r2',
    authorId: 'u-rocks',
    rating: 4,
    comment:
      'Vitae lacus, ut placerat non sapien. Urna, non euis id nec. Vitae est, ut adipiscing blandit.',
    date: '2022-09-10',
  },
];

export const getReviewsForOrganizer = () => reviews;
