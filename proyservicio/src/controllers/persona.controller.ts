import {service} from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Credenciales, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import { AutenticacionService } from '../services';
var fetch = require('node-fetch');

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AutenticacionService)
    public autenticacionService: AutenticacionService,
  ) {}

  @post("/identificarPersona", {
    responses:{
      '200':{
        description: "Identificacion de usuarios"
      }
    }
  })
async identificarPersona(
  @requestBody() credenciales: Credenciales
){
let p = await this.autenticacionService.IdentificarPersona(credenciales.usuario, credenciales.clave);
if(p){
  let token = this.autenticacionService.GenerarTokenJWT(p);
  return{
    datos:{
      nombre: p.nombres,
      correo: p.correo,
      id: p.id
    },
    tk: token
  }
}else{
  throw new HttpErrors[401]("Datos invalidos");
}
}

  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',

          }),
        },
      },
    })
    persona: Persona,
  ): Promise<Persona> {
    //var passwordGenerate = this.autenticacionService.generarClaveAleatoria();
    //console.log("La clave generada es: " + passwordGenerate);
    let clave = this.autenticacionService.generarClaveAleatoria();
    let claveCifrada = this.autenticacionService.cifrarClave(clave);
    persona.clave = claveCifrada;

   let p = await this.personaRepository.create(persona);

   //Notificar al usuario, se deben enviar 3 parametros
   let destino = persona.correo;
   let asunto = 'Registro en la plataforma';
   let contenido = `Hola ${persona.nombres}, su nombre de usuario ${persona.correo} y su contraseña es ${clave}`
   //fetch(`http://127.0.0.1:5000/envio-correo?correo-destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
   fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo-destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
   .then((data:any) =>{
    console.log(data);
   })
   return p;
  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
