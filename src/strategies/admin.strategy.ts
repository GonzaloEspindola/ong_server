import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';

export class AdminStrategy implements AuthenticationStrategy {
  name = 'admin';

  constructor(
    @service(JwtService)
  public serviceJwt : JwtService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request)
    if(!token) {
      throw new HttpErrors[401]('Token doesnt exist')
    }
    const info = this.serviceJwt.verifyToken(token)
    if(info) {
      if(info.data.roleId === '2') {
        const perfil: UserProfile = Object.assign({
          email: info.data.email,
          roleId: info.data.roleId
        })
        return perfil
      }else {
        throw new HttpErrors[401]('You need admin permissions for this')
      }
    }else {
      throw new HttpErrors[401]('Invalid token!')
    }
  }
}
