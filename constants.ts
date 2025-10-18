
import { Subject, Badge } from './types';

export const ALL_SUBJECTS: Subject[] = [
  Subject.MATH,
  Subject.SCIENCE,
  Subject.HISTORY,
  Subject.ITALIAN,
  Subject.ENGLISH,
  Subject.ART,
];

export const BADGES: { [key: string]: Badge } = {
  'perfect-score': {
    id: 'perfect-score',
    name: 'Punteggio Perfetto!',
    description: 'Ottieni un 10 in una qualsiasi materia.',
    icon: '🎯',
    xpBonus: 100,
  },
  'consistent-performer': {
    id: 'consistent-performer',
    name: 'Studente Costante',
    description: 'Ottieni 3 voti consecutivi sopra il 7 nella stessa materia.',
    icon: '📈',
    xpBonus: 100,
  },
  'quick-improver': {
    id: 'quick-improver',
    name: 'Miglioramento Rapido',
    description: 'Migliora il tuo voto di almeno 2 punti rispetto al precedente nella stessa materia.',
    icon: '🚀',
    xpBonus: 100,
  },
  'top-of-the-class': {
    id: 'top-of-the-class',
    name: 'Primo della Classe',
    description: 'Raggiungi la prima posizione in classifica generale.',
    icon: '🏆',
    xpBonus: 200,
  },
   'subject-master': {
    id: 'subject-master',
    name: 'Maestro della Materia',
    description: 'Ottieni una media del 9 o superiore in una materia.',
    icon: '🧠',
    xpBonus: 150,
  }
};
