import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Members, MembersRelations} from '../models';

export class MembersRepository extends DefaultCrudRepository<
  Members,
  typeof Members.prototype.id,
  MembersRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Members, dataSource);
  }
}
