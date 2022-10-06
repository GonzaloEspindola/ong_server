import {Entity, model, property} from '@loopback/repository';

@model()
export class Organization extends Entity {
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
    type: 'number',
    required: true,
  })
  phone: number;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  welcomeText: string;

  @property({
    type: 'string',
    required: true,
  })
  facebook: string;

  @property({
    type: 'string',
    required: true,
  })
  linkedin: string;

  @property({
    type: 'string',
    required: true,
  })
  instagram: string;

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

  constructor(data?: Partial<Organization>) {
    super(data);
  }
}

export interface OrganizationRelations {
  // describe navigational properties here
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
