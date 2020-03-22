import {
  Equals, IsObject,
} from 'class-validator';

import { IAnswer } from '../types/form';

function Type<T extends string>(value: T): (object: { type: T }, propertyName: 'type') => void {
  return Equals(value);
}

class FormAnswer {
  @Type('formAnswer')
  type!: 'formAnswer'

  @IsObject()
  answers!: IAnswer[]
}

export const blobClasses = {
  formAnswer: FormAnswer,
};
