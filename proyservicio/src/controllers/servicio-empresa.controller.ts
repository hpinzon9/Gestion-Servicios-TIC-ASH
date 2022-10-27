import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servicio,
  Empresa,
} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioEmpresaController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository: ServicioRepository,
  ) { }

  @get('/servicios/{id}/empresa', {
    responses: {
      '200': {
        description: 'Empresa belonging to Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async getEmpresa(
    @param.path.string('id') id: typeof Servicio.prototype.id,
  ): Promise<Empresa> {
    return this.servicioRepository.empresa(id);
  }
}
