import {Entity, model, property} from '@loopback/repository';

@model()
export class Testimonials extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      dataType: 'LONGTEXT'
    }
  })
  image: string;

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


  constructor(data?: Partial<Testimonials>) {
    super(data);
  }
}

export interface TestimonialsRelations {
  // describe navigational properties here
}

export type TestimonialsWithRelations = Testimonials & TestimonialsRelations;
