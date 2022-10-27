import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Directivo,
  Empresa,
} from '../models';
import {DirectivoRepository} from '../repositories';

export class DirectivoEmpresaController {
  constructor(
    @repository(DirectivoRepository)
    public directivoRepository: DirectivoRepository,
  ) { }

  @get('/directivos/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Directivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Directivo.prototype.id,
  ): Promise<Empresa> {
    return this.directivoRepository.empresa(id);
  }
}
