
export enum Role {
  STUDENT = 'student',
  ADMIN = 'admin',
}

export enum Subject {
  MATH = 'Matematica',
  SCIENCE = 'Scienze',
  HISTORY = 'Storia',
  ITALIAN = 'Italiano',
  ENGLISH = 'Inglese',
  ART = 'Arte',
}

export interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatar: string;
  xp: number;
  role: Role;
  privacy: {
    showNickname: boolean;
    anonymous: boolean;
  };
  badges: string[];
}

export interface Grade {
  id: string;
  userId: string;
  subject: Subject;
  value: number;
  date: string; // ISO string
  approved: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or SVG component name
  xpBonus: number;
}

export interface Team {
    id: string;
    name: string;
    memberIds: string[];
    logo: string; // Emoji or URL
}

export interface Notification {
    id: string;
    message: string;
    date: string; // ISO String
    read: boolean;
}
