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
} from '@loopback/rest';
import {Notificaciones} from '../models';
import {NotificacionesRepository} from '../repositories';

export class NotificacionesController {
  constructor(
    @repository(NotificacionesRepository)
    public notificacionesRepository : NotificacionesRepository,
  ) {}

  @post('/notificaciones')
  @response(200, {
    description: 'Notificaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificaciones',

          }),
        },
      },
    })
    notificaciones: Notificaciones,
  ): Promise<Notificaciones> {
    this.enviarSMS(notificaciones.mensaje);
    return this.notificacionesRepository.create(notificaciones);
  }

  @get('/notificaciones/count')
  @response(200, {
    description: 'Notificaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Notificaciones) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.notificacionesRepository.count(where);
  }

  @get('/notificaciones')
  @response(200, {
    description: 'Array of Notificaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Notificaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Notificaciones) filter?: Filter<Notificaciones>,
  ): Promise<Notificaciones[]> {
    return this.notificacionesRepository.find(filter);
  }

  @patch('/notificaciones')
  @response(200, {
    description: 'Notificaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {partial: true}),
        },
      },
    })
    notificaciones: Notificaciones,
    @param.where(Notificaciones) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.notificacionesRepository.updateAll(notificaciones, where);
  }

  @get('/notificaciones/{id}')
  @response(200, {
    description: 'Notificaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Notificaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Notificaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Notificaciones>
  ): Promise<Notificaciones> {
    return this.notificacionesRepository.findById(id, filter);
  }

  @patch('/notificaciones/{id}')
  @response(204, {
    description: 'Notificaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {partial: true}),
        },
      },
    })
    notificaciones: Notificaciones,
  ): Promise<void> {
    await this.notificacionesRepository.updateById(id, notificaciones);
  }

  @put('/notificaciones/{id}')
  @response(204, {
    description: 'Notificaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() notificaciones: Notificaciones,
  ): Promise<void> {
    await this.notificacionesRepository.replaceById(id, notificaciones);
  }

  @del('/notificaciones/{id}')
  @response(204, {
    description: 'Notificaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.notificacionesRepository.deleteById(id);
  }
  enviarSMS(mensaje:any){
const accountSid = 'ACe6469452f1a5ba777a30b39b29f5fc84';
const authToken = '3c3179c697cdb251904f4df11a5e61e5';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: mensaje,
     from: '+18039916184',
     to: '+5731535709992'
   })
  .then((message: any) => console.log(message.sid));
  }
}
