import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
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
  getModelSchemaRef, HttpErrors, param, patch, post, put, Request, requestBody,
  response, RestBindings
} from '@loopback/rest';
import {User} from '../models';
import {Credentials} from '../models/credentials.model';
import {RegisterModel} from '../models/register-model.model';
import {UserRepository} from '../repositories';
import {JwtService} from '../services';
const bcrypt = require("bcryptjs");

export class UsersController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @service(JwtService)
    public serviceJwt: JwtService,
    @inject(RestBindings.Http.REQUEST) private req: Request
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Login of user'
      }
    }
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credentials)
        }
      }
    }) credentials: Credentials
  ) : Promise<object>{
    const user = await this.userRepository.findOne({ where: { email: credentials.email } })

    if(user) {
      const decodedPassword = await bcrypt.compare(credentials.password, user.password)

      if(decodedPassword) {
        const tk = this.serviceJwt.createJwtToken(user);
        return {
          user: user,
          token: tk
        }
      }else {
        throw new HttpErrors[401]('Password incorrect')
      }
    }else {
      throw new HttpErrors[401]('User incorrect')
    }
  }

  @post('/users/register', {
    responses: {
      '200': {
        description: 'Register user'
      }
    }
  })
  async register(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegisterModel)
        }
      }
    }) registerModel: RegisterModel
  ) : Promise<object>{
    const user = await this.userRepository.findOne({ where: { email: registerModel.email } })
    if(user) {
      throw new HttpErrors[401]('User already exists')
    } else {
      const encryptedPassword = bcrypt.hashSync(registerModel.password, 10)
      registerModel.password = encryptedPassword
      registerModel.roleId = '1'
      const newUser = await this.userRepository.create(registerModel)

      const tk = this.serviceJwt.createJwtToken(newUser);
      return {
        user: newUser,
        token: tk
      }
    }
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'Profile user'
      }
    }
  })
  me() : void {
    const authToken = this.req.headers.authorization;
    if(authToken) {
      const token = authToken?.split(' ')[1]
      const userProfile = this.serviceJwt.verifyToken(token).data
      return userProfile
    }
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @authenticate('admin')
  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }


  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate('admin')
  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @authenticate('admin')
  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @authenticate('admin')
  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
