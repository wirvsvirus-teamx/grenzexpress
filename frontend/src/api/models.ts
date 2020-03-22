import {
  Equals, IsObject, IsString,
} from 'class-validator';

import { IAnswer, UID } from '../types/form';

function Type<T extends string>(value: T): (object: { type: T }, propertyName: 'type') => void {
  return Equals(value);
}

class FormAnswer {
  @Type('formAnswer')
  type!: 'formAnswer'

  @IsString()
  id!: UID

  @IsObject({ each: true })
  answers!: IAnswer[]
}

export const blobClasses = {
  formAnswer: FormAnswer,
};
