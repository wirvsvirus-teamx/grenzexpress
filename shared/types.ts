// A unique identifier across systems:
export type UID = string;

// Description of a different types of questions asked in a form:
export type IQuestionType = {
  "text-input": {
    name: string;
  };
  "number-input": {
    name: string;
  };
  "date-input": {
    name: string;
  };
  "yes-no": {
    question: string;
  };
  "multiple-choice": {
    question: string;
    choices: string[];
  };
  "upload-form": {
    title: string;
    description: string;
  };
};

// A question:
// Either use IQuestion to refer to questions in general or IQuestion<"text-input"> to refer to a specific question type
export type IQuestion<S extends keyof IQuestionType = keyof IQuestionType> = IQuestionType[S] & {
  type: S;
  id: UID;
  shared: boolean; // wether the question might appear in multiple forms, at different times, but the answer would be the same
};

// Possible answers to questions:
export type IAnswerType = {
  "text-input": {
    value: string;
  };
  "number-input": {
    value: number;
  };
  "date-input": {
    value: string /* unix timestamp */;
  };
  "yes-no": {
    yes: boolean;
  };
  "multiple-choice": {
    choice: string;
  };
  "upload-form": {
    image: string /*base64?*/;
  };
};

// An answer to a certain question
export type IAnswer<S extends IQuestion["type"] = IQuestion["type"]> = IAnswerType[S] & {
  type: S;
  id: string /*= question.id*/;
};

// A Pgae shows questions in a sorted way:
export interface IPage {
  title: string;
  questions: IQuestion["id"][];
  // Questions that are not needed may be skipped,
  // That way, we can create "question trees", e.g.
  // if A was answered with yes, B is needed, if A was answered with no, C is needed and so on
  isNeeded?: (getPrevious: <T extends IQuestion["type"]>(answerID: string) => IAnswer<T>) => boolean;
}

// A form is a collection of questions, grouped as pages
export type IForm = {
  id: string;
  title: string;
  pages: IPage[];

  validate: (getAnswer: <T extends IQuestion["type"]>(answerID: string) => IAnswer<T>) => {
    state: "valid" | "invalid" | "unknown"
    message: string;
  };
};

// answers a certain form
export type IFormAnswer = {
  userUid: IUser["uid"];
  uid: string;
  id: IForm["id"];
  answers: IAnswer[];
  key: string; // used to encrypt this form & send to server
};

// the encrypted representation of a form
export type IEncryptedFormAnswer = {
  userUid: IUser["uid"];
  uid: string; // answers can e retrieved on the server with this uid (by authorized personell), and can then be decrypted using the per answers key
  id: IForm["id"];
  answers: string; // the encrypted IAnswer[]s
};

// The user data stored on the device:
export interface IUserData {
  sharedAnswers: IAnswer[]; // answers that are viable for multiple forms
  answeredForms: IFormAnswer[];
  uid: string; // a unique identifier for the user
  token: string; // used to authenticate against the backend
  secret: string; // used to encrypt forms
}

// The user data sent & stored on the server
export type IUser = Omit<IUserData, "secret">;


export type IQuestionProps<Q extends IQuestion["type"]> = {
  question: IQuestion<Q>;
  answer?: IAnswer<Q>;
  setAnswer(answer: IAnswer<Q>): any;
}
