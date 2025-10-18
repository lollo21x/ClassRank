
import { User, Grade, Subject, Role, Team, Notification } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Mario Rossi',
    nickname: 'SuperMario',
    email: 'mario@test.com',
    avatar: 'https://i.pravatar.cc/150?u=user-1',
    xp: 1250,
    role: Role.STUDENT,
    privacy: { showNickname: true, anonymous: false },
    badges: ['perfect-score', 'quick-improver'],
  },
  {
    id: 'user-2',
    name: 'Luisa Verdi',
    nickname: 'GreenLight',
    email: 'luisa@test.com',
    avatar: 'https://i.pravatar.cc/150?u=user-2',
    xp: 1100,
    role: Role.STUDENT,
    privacy: { showNickname: true, anonymous: false },
    badges: ['consistent-performer'],
  },
  {
    id: 'user-3',
    name: 'Paolo Bianchi',
    nickname: 'WhiteP',
    email: 'paolo@test.com',
    avatar: 'https://i.pravatar.cc/150?u=user-3',
    xp: 1320,
    role: Role.STUDENT,
    privacy: { showNickname: false, anonymous: false },
    badges: ['subject-master'],
  },
  {
    id: 'user-4',
    name: 'Prof. Dumbledore',
    nickname: 'Admin',
    email: 'admin@test.com',
    avatar: 'https://i.pravatar.cc/150?u=user-4',
    xp: 0,
    role: Role.ADMIN,
    privacy: { showNickname: true, anonymous: false },
    badges: [],
  },
];

export const MOCK_GRADES: Grade[] = [
  // User 1 Grades
  { id: 'g1', userId: 'user-1', subject: Subject.MATH, value: 8, date: '2023-10-15T10:00:00Z', approved: true },
  { id: 'g2', userId: 'user-1', subject: Subject.MATH, value: 10, date: '2023-11-20T10:00:00Z', approved: true },
  { id: 'g3', userId: 'user-1', subject: Subject.HISTORY, value: 7, date: '2023-11-22T10:00:00Z', approved: true },
  { id: 'g4', userId: 'user-1', subject: Subject.SCIENCE, value: 9, date: '2023-11-25T10:00:00Z', approved: false },

  // User 2 Grades
  { id: 'g5', userId: 'user-2', subject: Subject.MATH, value: 7, date: '2023-10-16T10:00:00Z', approved: true },
  { id: 'g6', userId: 'user-2', subject: Subject.ITALIAN, value: 8, date: '2023-11-18T10:00:00Z', approved: true },
  { id: 'g7', userId: 'user-2', subject: Subject.ITALIAN, value: 8, date: '2023-11-25T10:00:00Z', approved: true },
  { id: 'g8', userId: 'user-2', subject: Subject.ITALIAN, value: 9, date: '2023-11-28T10:00:00Z', approved: true },
  
  // User 3 Grades
  { id: 'g9', userId: 'user-3', subject: Subject.ENGLISH, value: 9, date: '2023-10-20T10:00:00Z', approved: true },
  { id: 'g10', userId: 'user-3', subject: Subject.ENGLISH, value: 10, date: '2023-11-15T10:00:00Z', approved: true },
  { id: 'g11', userId: 'user-3', subject: Subject.ART, value: 9, date: '2023-11-21T10:00:00Z', approved: true },
  { id: 'g12', userId: 'user-3', subject: Subject.ART, value: 8, date: '2023-11-29T10:00:00Z', approved: true },
];

export const MOCK_TEAMS: Team[] = [
    { id: 'team-1', name: 'Team Galileo', memberIds: ['user-1'], logo: '🔭' },
    { id: 'team-2', name: 'Team Archimede', memberIds: ['user-2', 'user-3'], logo: '💡' },
];


export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 'n1', message: 'Hai superato GreenLight in classifica! 🔥', date: new Date().toISOString(), read: false },
    { id: 'n2', message: 'Hai sbloccato il badge: Punteggio Perfetto! 🎯', date: new Date(Date.now() - 86400000).toISOString(), read: false },
    { id: 'n3', message: 'Nuovo voto in Matematica in attesa di approvazione.', date: new Date(Date.now() - 172800000).toISOString(), read: true },
];
