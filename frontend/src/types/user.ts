/* eslint-disable @typescript-eslint/interface-name-prefix */

import { IFormAnswers } from './answers';
import { IAnswer, UID } from './form';

// The user data stored on the device:
export interface IUserData {
  sharedAnswers: IAnswer[]; // answers that are viable for multiple forms
  answeredForms: IFormAnswers[];
  uid: UID; // a unique identifier for the user
  token: string; // used to authenticate against the backend
  secret: string; // used to encrypt forms
}

// The user data sent & stored on the server
export type IUser = Omit<IUserData, 'secret'>;
