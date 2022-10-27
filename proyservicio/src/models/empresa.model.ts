import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Directivo} from './directivo.model';
import {Empleado} from './empleado.model';
import {Servicio} from './servicio.model';

@model()
export class Empresa extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  razon_social: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Directivo)
  directivos: Directivo[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Servicio)
  servicios: Servicio[];

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
