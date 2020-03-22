/* eslint-disable @typescript-eslint/interface-name-prefix */

// A unique identifier across systems:
export type UID = string;

// Description of a different types of questions asked in a form:
interface IQuestionType {
  'text-input': {
    name: string;
  };
  'number-input': {
    name: string;
  };
  'date-input': {
    name: string;
  };
  'yes-no': {
    question: string;
  };
  'multiple-choice': {
    question: string;
    choices: string[];
  };
  'upload-form': {
    title: string;
    description: string;
  };
  'signature': {};
}

// A question:
// Either use IQuestion to refer to questions in general
// or IQuestion<"text-input"> to refer to a specific question type
export type IQuestion<S extends keyof IQuestionType = keyof IQuestionType> = IQuestionType[S] & {
  type: S;
  id: UID;
  // wether the question might appear in multiple forms, at different times,
  // but the answer would be the same
  shared: boolean;
};

// Possible answers to questions:
export interface IAnswerType {
  'text-input': {
    value: string;
  };
  'number-input': {
    value: number;
  };
  'date-input': {
    value: string /* unix timestamp */;
  };
  'yes-no': {
    yes: boolean;
  };
  'multiple-choice': {
    choice: string;
  };
  'upload-form': {
    image: string /* base64?*/;
  };
  'signature': {
    signature: string;
  };
}

// An answer to a certain question
export type IAnswer<S extends IQuestion['type'] = IQuestion['type']> = IAnswerType[S] & {
  type: S;
  id: string /* = question.id*/;
};

// A Page shows questions in a sorted way:
export interface IPage {
  title: string;
  description?: string;
  questions: IQuestion['id'][];
  // Questions that are not needed may be skipped,
  // That way, we can create "question trees", e.g.
  // if A was answered with yes, B is needed, if A was answered with no, C is needed and so on
  isNeeded?: (getPrevious: <T extends IQuestion['type']>(answerID: string) => IAnswer<T>) => boolean;
}

// A form is a collection of questions, grouped as pages
export interface IForm {
  id: string;
  title: string;
  pages: IPage[];

  validate: (getAnswer: <T extends IQuestion['type']>(answerID: string) => IAnswer<T>) => {
    state: 'valid' | 'invalid' | 'unknown';
    message: string;
  };
}
