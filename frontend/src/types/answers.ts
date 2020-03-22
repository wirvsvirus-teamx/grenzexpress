/* eslint-disable @typescript-eslint/interface-name-prefix */

import { BlobWriter } from '../api';
import { IAnswer, IForm, UID } from './form';

// answers a certain form
export type IFormAnswers = {
  userUid: UID;
  uid: UID;
  id: IForm['id'];
  answers: IAnswer[];
};

export interface IStoredFormAnswers extends IFormAnswers {
  writer: BlobWriter<'formAnswer'>;
}
