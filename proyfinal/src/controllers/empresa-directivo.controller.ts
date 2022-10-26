import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empresa,
  Directivo,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaDirectivoController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/directivos', {
    responses: {
      '200': {
        description: 'Array of Empresa has many Directivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Directivo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Directivo>,
  ): Promise<Directivo[]> {
    return this.empresaRepository.directivos(id).find(filter);
  }

  @post('/empresas/{id}/directivos', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Directivo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {
            title: 'NewDirectivoInEmpresa',
            exclude: ['id'],
            optional: ['empresaId']
          }),
        },
      },
    }) directivo: Omit<Directivo, 'id'>,
  ): Promise<Directivo> {
    return this.empresaRepository.directivos(id).create(directivo);
  }

  @patch('/empresas/{id}/directivos', {
    responses: {
      '200': {
        description: 'Empresa.Directivo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Directivo, {partial: true}),
        },
      },
    })
    directivo: Partial<Directivo>,
    @param.query.object('where', getWhereSchemaFor(Directivo)) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.empresaRepository.directivos(id).patch(directivo, where);
  }

  @del('/empresas/{id}/directivos', {
    responses: {
      '200': {
        description: 'Empresa.Directivo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Directivo)) where?: Where<Directivo>,
  ): Promise<Count> {
    return this.empresaRepository.directivos(id).delete(where);
  }
}
