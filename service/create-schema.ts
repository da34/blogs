import { MikroORM } from '@mikro-orm/core';
import { Content } from './src/modules/contents/content.entity';
import { User } from './src/modules/users/user.entity';

(async () => {
  const orm = await MikroORM.init({
    entities: [Content, User],
    dbName: 'my-db-blog',
    type: 'sqlite',
    // ...
  });
  const generator = orm.getSchemaGenerator();

  // or you can run those queries directly, but be sure to check them first!
  await generator.dropSchema();
  await generator.createSchema();
  // await generator.updateSchema();

  // in tests it can be handy to use those:
  await generator.refreshDatabase(); // ensure db exists and is fresh
  // await generator.clearDatabase(); // removes all data

  await orm.close(true);
})();
