import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dsmongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://hpinzon9:Colombia2022@cluster0.m6me7q5.mongodb.net/serviweb',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DsmongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dsmongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dsmongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
