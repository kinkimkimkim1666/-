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
    { day: 1, name: '陳大文 (Chan Tai Man)', phone: '9123****' },
    { day: 1, name: '李小龍 (Lee Siu Lung)', phone: '6888****' },
    { day: 1, name: '張偉明 (Cheung Wai Man)', phone: '9000****' },
    { day: 1, name: '黃小玲 (Wong Siu Ling)', phone: '5566****' },
    { day: 1, name: '何國強 (Ho Kwok Keung)', phone: '9876****' },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
};