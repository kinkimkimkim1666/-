export interface Winner {
  day: number;
  name: string;
  phone: string;
}

export interface DailyWinners {
  [day: number]: Winner[];
}

export enum AppView {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN',
}

// Default initial data for demonstration
export const INITIAL_WINNERS: DailyWinners = {
  1: [
    { day: 1, name: 'Chan Mei Ling', phone: '9123****' },
    { day: 1, name: 'Lau Ka Ho', phone: '6888****' },
    { day: 1, name: 'Cheung Wai Man', phone: '9000****' },
    { day: 1, name: 'Wong Siu Ming', phone: '5566****' },
    { day: 1, name: 'Lee Kwok Keung', phone: '9876****' },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
};