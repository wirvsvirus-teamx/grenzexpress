import {
  Equals, IsObject,
} from 'class-validator';

function Type<T extends string>(value: T): (object: { type: T }, propertyName: 'type') => void {
  return Equals(value);
}

class FormAnswer {
  @Type('formAnswer')
  type!: 'formAnswer'

  @IsObject()
  answers!: Record<string, any>
}

export const blobClasses = {
  formAnswer: FormAnswer,
};
