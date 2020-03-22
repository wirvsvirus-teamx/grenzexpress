/* eslint-disable @typescript-eslint/interface-name-prefix */

import { IAnswer, IQuestion } from './form';

export interface IQuestionProps<Q extends IQuestion['type']> {
  question: IQuestion<Q>;
  answer?: IAnswer<Q>;
  setAnswer(answer: IAnswer<Q>): any;
  removeAnswer(id: IAnswer['id']): void;
}
