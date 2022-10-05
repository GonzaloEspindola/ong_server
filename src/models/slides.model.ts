import {Entity, model, property} from '@loopback/repository';

@model()
export class Slides extends Entity {
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
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  text: string;


  constructor(data?: Partial<Slides>) {
    super(data);
  }
}

export interface SlidesRelations {
  // describe navigational properties here
}

export type SlidesWithRelations = Slides & SlidesRelations;
