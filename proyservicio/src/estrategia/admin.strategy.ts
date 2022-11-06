import {AuthenticationStrategy} from '@loopback/authentication';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';
import {service} from '@loopback/core';
import {AutenticacionService} from '../services';


export class EstrategiaAdministrador implements AuthenticationStrategy{
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){}

  async authenticate(request: Request): Promise<UserProfile | undefined>{
  let token = parseBearerToken(request);
  if(token){
    let datos = this.servicioAutenticacion.validarTokenJWT(token);
    if(datos){
      let perfil: UserProfile = Object.assign({
        nombre: datos.data.nombre
      });
      return perfil;
    }else{
      throw new HttpErrors[401]("El token incluido no es valido")
    }
  }else{
    throw new HttpErrors[401]("No se ha incluido un token en la solicitud")
  }
  }
}
