import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Empresa} from './empresa.model';
import {Cliente} from './cliente.model';

@model()
export class Servicio extends Entity {
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
  nombre_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  especialidad: string;

  @property({
    type: 'number',
    required: true,
  })
  precio_hora: number;

  @belongsTo(() => Empresa)
  empresaId: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @hasOne(() => Cliente)
  cliente: Cliente;

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
