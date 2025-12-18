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
    { day: 1, name: 'Chan Tai Man', phone: '9123****' },
    { day: 1, name: 'Wong Siu Ming', phone: '6888****' },
    { day: 1, name: 'Lee Ka Yan', phone: '9000****' },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
};