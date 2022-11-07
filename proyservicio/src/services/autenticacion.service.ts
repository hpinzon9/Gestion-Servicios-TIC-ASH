import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {relation, repository} from '@loopback/repository';
import {Personalization} from '@sendgrid/helpers/classes';
import {Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {Llaves} from '../config/llaves';
var generatePassword = require('password-generator');
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) {}
  generarClaveAleatoria = (): string => { // gerenerar clave aleatoria
    var claveGenerada = generatePassword(12, false);
    return claveGenerada;
  };

  cifrarClave = (clave: string): string => {
    let claveCifrada = CryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string){
    try{
      let p = this.personaRepository.findOne({where:{correo: usuario, clave: clave}});
      if(p){
        return p;
      }
      return false;
    }catch{
      return false;
    }
  }
// creacion de un token
  GenerarTokenJWT(persona: Persona){
    let token = jwt.sign({
    data:{
      id: persona.id,
      correo: persona.correo,
      nombre: persona.nombres + " " + persona.apellidos,
    }
  },
  Llaves.claveJWT);
  return token;
  }

  validarTokenJWT(token: string){
  try{
    let datos = jwt.verify(token, Llaves.claveJWT);
    return datos;
  }catch{
    return false;
  }
}
}


