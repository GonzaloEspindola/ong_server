import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Testimonials, TestimonialsRelations} from '../models';

export class TestimonialsRepository extends DefaultCrudRepository<
  Testimonials,
  typeof Testimonials.prototype.id,
  TestimonialsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Testimonials, dataSource);
  }
}
