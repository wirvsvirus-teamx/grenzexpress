/* eslint-disable @typescript-eslint/interface-name-prefix */

import { BlobReader } from '../api';
import { IAnswer, IForm } from './form';

// answers a certain form
export interface IFormAnswers {
  id: IForm['id'];
  answers: IAnswer[];
  writer: BlobReader<'formAnswer'>;
}
