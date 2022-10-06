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
import {Members} from '../models';
import {MembersRepository} from '../repositories';

export class MembersController {
  constructor(
    @repository(MembersRepository)
    public membersRepository : MembersRepository,
  ) {}

  @authenticate('admin')
  @post('/members')
  @response(200, {
    description: 'Members model instance',
    content: {'application/json': {schema: getModelSchemaRef(Members)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Members, {
            title: 'NewMembers',
            exclude: ['id'],
          }),
        },
      },
    })
    members: Omit<Members, 'id'>,
  ): Promise<Members> {
    return this.membersRepository.create(members);
  }

  @get('/members/count')
  @response(200, {
    description: 'Members model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Members) where?: Where<Members>,
  ): Promise<Count> {
    return this.membersRepository.count(where);
  }

  @get('/members')
  @response(200, {
    description: 'Array of Members model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Members, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Members) filter?: Filter<Members>,
  ): Promise<Members[]> {
    return this.membersRepository.find(filter);
  }

  @authenticate('admin')
  @patch('/members')
  @response(200, {
    description: 'Members PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Members, {partial: true}),
        },
      },
    })
    members: Members,
    @param.where(Members) where?: Where<Members>,
  ): Promise<Count> {
    return this.membersRepository.updateAll(members, where);
  }

  @get('/members/{id}')
  @response(200, {
    description: 'Members model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Members, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Members, {exclude: 'where'}) filter?: FilterExcludingWhere<Members>
  ): Promise<Members> {
    return this.membersRepository.findById(id, filter);
  }

  @authenticate('admin')
  @patch('/members/{id}')
  @response(204, {
    description: 'Members PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Members, {partial: true}),
        },
      },
    })
    members: Members,
  ): Promise<void> {
    await this.membersRepository.updateById(id, members);
  }

  @authenticate('admin')
  @put('/members/{id}')
  @response(204, {
    description: 'Members PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() members: Members,
  ): Promise<void> {
    await this.membersRepository.replaceById(id, members);
  }

  @authenticate('admin')
  @del('/members/{id}')
  @response(204, {
    description: 'Members DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.membersRepository.deleteById(id);
  }
}
