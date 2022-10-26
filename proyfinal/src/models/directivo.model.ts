import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';

@model()
export class Directivo extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'number',
    required: true,
  })
  sueldo_bruto: number;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Directivo>) {
    super(data);
  }
}

export interface DirectivoRelations {
  // describe navigational properties here
}

export type DirectivoWithRelations = Directivo & DirectivoRelations;
