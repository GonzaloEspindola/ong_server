import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
import {User} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) {}

  createJwtToken(user: User) {
    const secret = Keys.jwtKey;
    const tk = jwt.sign({
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        email: user.email,
        roleId: user.roleId
      }
    }, secret);
    return tk;
  }

  verifyToken(token: string) {
    const decodedToken = jwt.verify(token, Keys.jwtKey);
    return decodedToken;
  }
}
