import { IForm, IQuestion } from '../types';

export const questions: IQuestion[] = [
  // personal data
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
    id: 'nationality',
    type: 'multiple-choice',
    question: 'Welche Staatsangehörigkeit besitzen sie?',
    choices: ['deutsch', 'französisch'],
    shared: true,
  },
  // residency
  {
    type: 'text-input',
    id: 'address',
    name: 'Adresse',
    shared: true,
  },
  {
    type: 'text-input',
    id: 'city',
    name: 'Ort',
    shared: true,
  },
  {
    type: 'text-input',
    id: 'postal-code',
    name: 'Postleitzahl',
    shared: true,
  },
  // company data
  {
    type: 'text-input',
    id: 'company-name',
    name: 'Firma',
    shared: true,
  },
  {
    type: 'text-input',
    id: 'company-address',
    name: 'Firmenadresse',
    shared: true,
  },
  {
    type: 'text-input',
    id: 'company-city',
    name: 'Ort der Firma',
    shared: true,
  },
  {
    type: 'text-input',
    id: 'company-postal-code',
    name: 'Postleitzahl',
    shared: true,
  },
  {
    type: 'multiple-choice',
    id: 'company-country',
    name: 'Land',
    choices: [
      'Deutschland',
      'Frankreich',
    ],
    shared: true,
  },
  // company contact person
  {
    type: 'text-input',
    id: 'company-contact-firstname',
    name: 'Vorname',
    shared: false,
  },
  {
    type: 'text-input',
    id: 'company-contact-lastname',
    name: 'Nachname',
    shared: false,
  },
  {
    type: 'text-input',
    id: 'company-contact-tel',
    name: 'Telefonnummer',
    shared: false,
  },
  // questions
  {
    id: 'residency',
    type: 'yes-no',
    question: 'Wohnen Sie in Deutschland?',
    shared: true,
  },
  {
    id: 'other-reason',
    type: 'multiple-choice',
    question: 'Trifft folgendes auf sie zu:',
    choices: [
      'Ich liefere Waren',
      'Ich arbeite in Deutschland',
      'Ich habe einen Arzttermin',
      'Ich möchte Familienangehörige betreuen',
      'Ich möchte Familienangehörige abholen',
      'Ich möchte Tiere versorgen',
      'Ich möchte jemanden besuchen',
      'Ich bin auf der Durchreise',
      'Ich möchte Waren einkaufen / abholen',
      'Ich ziehe um',
      'Ich bin Pächter eines Waldes',
    ],
    shared: false,
  },
  {
    id: 'wildlife-collision',
    type: 'yes-no',
    question: 'Gab es einen Wildunfall auf ihrem Land?',
    shared: false,
  },
  {
    id: 'return',
    type: 'yes-no',
    question: 'Sind sie auf dem Rückweg in ihr Heimatland?',
    shared: false,
  },
  {
    id: 'urgent',
    type: 'yes-no',
    question: 'Ist der Besuch aus medizinischen Gründen zwingend notwendig?',
    shared: false,
  },
  // papers
  {
    id: 'residence-permit',
    type: 'upload-form',
    name: 'Aufenthaltstitel',
    shared: true,
  },
  {
    id: 'commuting-licence',
    type: 'upload-form',
    name: 'Pendlerbescheinigung',
    shared: false,
  },
  {
    id: 'medical-certificate',
    type: 'upload-form',
    name: 'Ärztliche Bescheinigung',
    shared: false,
  },
  // signature
  {
    id: 'signature',
    type: 'signature',
    shared: false,
  },
];

export const forms: IForm[] = [
  {
    id: 'pass-border',
    title: 'Einreise',
    pages: [
      {
        title: 'Persönliche Daten',
        questions: ['first-name', 'last-name', 'date-of-birth', 'nationality'],
      },
      {
        title: 'Wohnsitz',
        questions: ['residency', 'address', 'city', 'postal-code'],
        isNeeded(get) {
          return get<'multiple-choice'>('nationality').choice !== 'deutsch';
        },
      },
      {
        title: 'Grund der Einreise',
        questions: ['other-reason'],
        isNeeded(get) {
          return get<'multiple-choice'>('nationality').choice !== 'deutsch'
                   && !get<'yes-no'>('residency').yes;
        },
      },
      {
        title: 'Notwendigkeit',
        questions: ['urgent'],
        isNeeded(get) {
          const reason = get<'multiple-choice'>('other-reason');
          console.log(`notw. ${reason}`);
          return reason && [
            'Ich habe einen Arzttermin',
            'Ich möchte Familienangehörige betreuen',
            'Ich möchte Familienangehörige abholen',
            'Ich möchte Tiere versorgen',
          ].includes(reason.choice);
        },
      },
      {
        title: 'Heimreise',
        questions: ['return'],
        isNeeded(get) {
          const reason = get<'multiple-choice'>('other-reason');
          return reason && reason.choice === 'Ich bin auf der Durchreise';
        },
      },
      {
        title: 'Wildunfall',
        questions: ['wildlife-collision'],
        isNeeded(get) {
          const reason = get<'multiple-choice'>('other-reason');
          return reason && reason.choice === 'Ich bin Pächter eines Waldes';
        },
      },
      {
        title: 'Aufenthaltstitel',
        questions: ['residence-permit'],
        isNeeded(get) {
          const nationality = get<'multiple-choice'>('nationality');
          const residency = get<'yes-no'>('residency');

          return nationality.choice !== 'deutsch' && residency.yes;
        },
      },
      {
        title: 'Pendlerbescheinigung',
        questions: ['commuting-licence'],
        isNeeded(get) {
          const reason = get<'multiple-choice'>('other-reason');
          return reason && reason.choice === 'Ich arbeite in Deutschland';
        },
      },
      {
        title: 'Ärztliche Bescheinigung',
        questions: ['medical-certificate'],
        isNeeded(get) {
          const reason = get<'multiple-choice'>('other-reason');
          return reason && reason.choice === 'Ich habe einen Arzttermin';
        },
      },
      {
        title: 'Firma',
        questions: ['company-name', 'company-address', 'company-city', 'company-postal-code', 'company-contact-firstname', 'company-contact-lastname', 'company-contact-tel'],
        isNeeded(get) {
          const reason = get<'multiple-choice'>('other-reason');
          return reason && ['Ich liefere Waren', 'Ich arbeite in Deutschland'].includes(reason.choice);
        },
      },
      {
        title: 'Unterschrift',
        description: 'Mit der Unterschrift bestätigen sie, alle Angaben wahrheitsgemäß gemacht zu haben.',
        questions: ['signature'],
      },
    ],
    validate(get) {
      const nationality = get<'multiple-choice'>('nationality');
      if (nationality.choice === 'deutsch') {
        return {
          state: 'valid',
          message: 'Deutsche Staatsbürger dürfen grundsätzlich wieder einreisen',
        };
      }

      const residency = get<'yes-no'>('residency');
      if (residency.yes) {
        return {
          state: 'valid',
          message: 'Personen mit Wohnsitz in Deutschland dürfen grundsätzlich wieder einreisen',
        };
      }

      const reason = get<'multiple-choice'>('other-reason');
      if (['Ich liefere Waren', 'Ich arbeite in Deutschland'].includes(reason.choice)) {
        return {
          state: 'valid',
          message: 'Pendler und Lieferanten dürfen grundsätzlich nach Deutschland einreisen',
        };
      }

      if (reason.choice === 'Ich ziehe um') {
        return {
          state: 'unknown',
          message: 'Umzüge sind prinzipiell erlaubt',
        };
      }

      const urgent = get<'yes-no'>('urgent');
      if (urgent && urgent.yes) {
        return {
          state: 'unknown',
          message: 'Personen dürfen aufgrund triftiger Gründe prinzipiell einreisen.',
        };
      }

      const returnHome = get<'yes-no'>('return');
      if (returnHome && returnHome.yes) {
        return {
          state: 'unknown',
          message: 'Die Durchreise ist prinzipiell gestattet.',
        };
      }

      const wildlifeCollision = get<'yes-no'>('wildlife-collision');
      if (wildlifeCollision && wildlifeCollision.yes) {
        return {
          state: 'unknown',
          message: 'Die Einreise ist aufgrund von Wildunfällen für Pächter prinzipiell gestattet',
        };
      }

      return {
        state: 'invalid',
        message: 'Die Einreise ist nur bei trifftigen Gründen erlaubt. Dies liegt bei ihnen vermutlich nicht vor. Die Einreiseerlaubnis ist unwahrscheinlich.',
      };
    },
  },
];

export function getForm(id: string): IForm | undefined {
  for (const form of forms) {
    if (form.id === id) return form;
  }
  return undefined;
}
