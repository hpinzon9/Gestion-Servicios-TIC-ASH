import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DsmongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Cliente, Directivo, Empleado, Servicio} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DirectivoRepository} from './directivo.repository';
import {EmpleadoRepository} from './empleado.repository';
import {ServicioRepository} from './servicio.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Empresa.prototype.id>;

  public readonly directivos: HasManyRepositoryFactory<Directivo, typeof Empresa.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empresa.prototype.id>;

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.dsmongodb') dataSource: DsmongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DirectivoRepository') protected directivoRepositoryGetter: Getter<DirectivoRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>,
  ) {
    super(Empresa, dataSource);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.directivos = this.createHasManyRepositoryFactoryFor('directivos', directivoRepositoryGetter,);
    this.registerInclusionResolver('directivos', this.directivos.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
