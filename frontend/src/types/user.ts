/* eslint-disable @typescript-eslint/interface-name-prefix */

import { IFormAnswers } from './answers';
import { IAnswer } from './form';

// The user data sent & stored on the server
export interface IUser {
  sharedAnswers: IAnswer[]; // answers that are viable for multiple forms
  answeredForms: IFormAnswers[];
}
