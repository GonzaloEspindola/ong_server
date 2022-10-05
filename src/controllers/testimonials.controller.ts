import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Testimonials} from '../models';
import {TestimonialsRepository} from '../repositories';

export class TestimonialsController {
  constructor(
    @repository(TestimonialsRepository)
    public testimonialsRepository : TestimonialsRepository,
  ) {}

  @post('/testimonials')
  @response(200, {
    description: 'Testimonials model instance',
    content: {'application/json': {schema: getModelSchemaRef(Testimonials)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimonials, {
            title: 'NewTestimonials',
            exclude: ['id'],
          }),
        },
      },
    })
    testimonials: Omit<Testimonials, 'id'>,
  ): Promise<Testimonials> {
    return this.testimonialsRepository.create(testimonials);
  }

  @get('/testimonials/count')
  @response(200, {
    description: 'Testimonials model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Testimonials) where?: Where<Testimonials>,
  ): Promise<Count> {
    return this.testimonialsRepository.count(where);
  }

  @get('/testimonials')
  @response(200, {
    description: 'Array of Testimonials model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testimonials, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Testimonials) filter?: Filter<Testimonials>,
  ): Promise<Testimonials[]> {
    return this.testimonialsRepository.find(filter);
  }

  @patch('/testimonials')
  @response(200, {
    description: 'Testimonials PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimonials, {partial: true}),
        },
      },
    })
    testimonials: Testimonials,
    @param.where(Testimonials) where?: Where<Testimonials>,
  ): Promise<Count> {
    return this.testimonialsRepository.updateAll(testimonials, where);
  }

  @get('/testimonials/{id}')
  @response(200, {
    description: 'Testimonials model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Testimonials, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Testimonials, {exclude: 'where'}) filter?: FilterExcludingWhere<Testimonials>
  ): Promise<Testimonials> {
    return this.testimonialsRepository.findById(id, filter);
  }

  @patch('/testimonials/{id}')
  @response(204, {
    description: 'Testimonials PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testimonials, {partial: true}),
        },
      },
    })
    testimonials: Testimonials,
  ): Promise<void> {
    await this.testimonialsRepository.updateById(id, testimonials);
  }

  @put('/testimonials/{id}')
  @response(204, {
    description: 'Testimonials PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testimonials: Testimonials,
  ): Promise<void> {
    await this.testimonialsRepository.replaceById(id, testimonials);
  }

  @del('/testimonials/{id}')
  @response(204, {
    description: 'Testimonials DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testimonialsRepository.deleteById(id);
  }
}
