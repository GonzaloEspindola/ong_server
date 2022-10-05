import {Entity, model, property} from '@loopback/repository';

@model()
export class Contacts extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  phone: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Contacts>) {
    super(data);
  }
}

export interface ContactsRelations {
  // describe navigational properties here
}

export type ContactsWithRelations = Contacts & ContactsRelations;
