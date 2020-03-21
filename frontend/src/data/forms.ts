import { IForm, IQuestion, IAnswer } from '../../../shared/types';

export const questions: IQuestion[] = [
  {
    type: 'text-input',
    name: 'Vorname',
    id: 'first-name',
    shared: true,
  },
  {
    type: 'text-input',
    name: 'Nachname',
    id: 'last-name',
    shared: true,
  },
  {
    type: 'date-input',
    name: 'Geburtsdatum',
    id: 'date-of-birth',
    shared: true,
  },
  {
    id: 'residency',
    type: 'multiple-choice',
    question: 'Welche Staatsangehörigkeit besitzen sie?',
    choices: ['deutsch', 'französisch'],
    shared: true,
  },
  {
    id: 'alone',
    type: 'yes-no',
    question: 'Reisen sie heute alleine?',
    isNeeded(previousAnswers) {
      const residency = previousAnswers.find((it) => it.id === 'residency') as IAnswer<'multiple-choice'>;
      return !residency || residency.choice !== 'deutsch';
    },
    shared: false,
  },
];

export const forms: IForm[] = [
  {
    id: 'pass-border',
    title: 'Einreise',
    questions: ['first-name', 'last-name', 'date-of-birth', 'residency', 'alone'],
    validations: [],
  },
];
