import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Slides, SlidesRelations} from '../models';

export class SlidesRepository extends DefaultCrudRepository<
  Slides,
  typeof Slides.prototype.id,
  SlidesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Slides, dataSource);
  }
}
