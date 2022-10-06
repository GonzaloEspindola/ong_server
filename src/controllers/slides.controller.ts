import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Slides} from '../models';
import {SlidesRepository} from '../repositories';

export class SlidesController {
  constructor(
    @repository(SlidesRepository)
    public slidesRepository : SlidesRepository,
  ) {}

  @authenticate('admin')
  @post('/slides')
  @response(200, {
    description: 'Slides model instance',
    content: {'application/json': {schema: getModelSchemaRef(Slides)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slides, {
            title: 'NewSlides',
            exclude: ['id'],
          }),
        },
      },
    })
    slides: Omit<Slides, 'id'>,
  ): Promise<Slides> {
    return this.slidesRepository.create(slides);
  }

  @get('/slides/count')
  @response(200, {
    description: 'Slides model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Slides) where?: Where<Slides>,
  ): Promise<Count> {
    return this.slidesRepository.count(where);
  }

  @get('/slides')
  @response(200, {
    description: 'Array of Slides model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Slides, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Slides) filter?: Filter<Slides>,
  ): Promise<Slides[]> {
    return this.slidesRepository.find(filter);
  }

  @authenticate('admin')
  @patch('/slides')
  @response(200, {
    description: 'Slides PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slides, {partial: true}),
        },
      },
    })
    slides: Slides,
    @param.where(Slides) where?: Where<Slides>,
  ): Promise<Count> {
    return this.slidesRepository.updateAll(slides, where);
  }

  @get('/slides/{id}')
  @response(200, {
    description: 'Slides model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Slides, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Slides, {exclude: 'where'}) filter?: FilterExcludingWhere<Slides>
  ): Promise<Slides> {
    return this.slidesRepository.findById(id, filter);
  }

  @authenticate('admin')
  @patch('/slides/{id}')
  @response(204, {
    description: 'Slides PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Slides, {partial: true}),
        },
      },
    })
    slides: Slides,
  ): Promise<void> {
    await this.slidesRepository.updateById(id, slides);
  }

  @authenticate('admin')
  @put('/slides/{id}')
  @response(204, {
    description: 'Slides PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() slides: Slides,
  ): Promise<void> {
    await this.slidesRepository.replaceById(id, slides);
  }

  @authenticate('admin')
  @del('/slides/{id}')
  @response(204, {
    description: 'Slides DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.slidesRepository.deleteById(id);
  }
}
