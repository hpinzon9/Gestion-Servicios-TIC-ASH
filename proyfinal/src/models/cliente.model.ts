import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Servicio} from './servicio.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  razon_social: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @hasOne(() => Servicio)
  servicio: Servicio;

  @property({
    type: 'string',
  })
  servicioId?: string;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
