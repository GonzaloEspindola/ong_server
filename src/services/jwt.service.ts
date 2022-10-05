import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
import {User} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  createJWToken(user: User) {
    const secret = Keys.jwtKey;
    const token = jwt.sign({
      data: {
        id: user.id,
        email: user.email,
        rol: user.roleId
      }
    }, secret)
    return token;
  }
}
