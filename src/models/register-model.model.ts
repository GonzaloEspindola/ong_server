import {Model, model, property} from '@loopback/repository';

@model()
export class RegisterModel extends Model {
  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: false,
  })
  roleId: string;


  constructor(data?: Partial<RegisterModel>) {
    super(data);
  }
}

export interface RegisterModelRelations {
  // describe navigational properties here
}

export type RegisterModelWithRelations = RegisterModel & RegisterModelRelations;
