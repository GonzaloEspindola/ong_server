import {Entity, model, property} from '@loopback/repository';

@model()
export class Members extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'LONGTEXT'
    }
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  createdAt?: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Members>) {
    super(data);
  }
}

export interface MembersRelations {
  // describe navigational properties here
}

export type MembersWithRelations = Members & MembersRelations;
