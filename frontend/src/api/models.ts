import {
  Equals, IsObject,
} from 'class-validator';

import { IFormAnswer } from '../types';

function Type<T extends string>(value: T): (object: { type: T }, propertyName: 'type') => void {
  return Equals(value);
}

class FormAnswer {
  @Type('formAnswer')
  type!: 'formAnswer'

  @IsObject()
  answer!: IFormAnswer
}

export const blobClasses = {
  formAnswer: FormAnswer,
};
