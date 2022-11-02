import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
var generatePassword = require('password-generator');
var CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) {}
  generarClaveAleatoria = (): string => { // gerenerar clave aleatoria
    var claveGenerada = generatePassword(12, false);
    return claveGenerada;
  };

  cifrarClave = (clave: string): string => {
    return CryptoJS.MD5(clave).toString();
  }
}
