import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import configuration from '../config/configuration';
import { UsersModule } from './modules/users/users.module';
import { ContentsModule } from './modules/contents/contents.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MetasModule } from './modules/metas/metas.module';
import { CommentsModule } from './modules/comments/comments.module';
import { RelationshipsModule } from './modules/relationships/relationships.module';
import { User, Comment, Content, Meta, BaseEntity } from './entities';

const logger = new Logger('MikroORM');

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局导入
      cache: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: [User, Comment, Content, Meta, BaseEntity],
      dbName: 'my-db-blog',
      type: 'sqlite',
      debug: true,
      logger: logger.log.bind(logger),
    }),
    // MailerModule.forRootAsync({
    // imports: [ConfigModule],
    // inject: [ConfigService],
    // useFactory: (configService: ConfigService) => {
    //   const smtp = configService.get('smtp');
    //   return {
    //     transport: {
    //       host: smtp.host,
    //       port: smtp.port,
    //       secure: true, // upgrade later with STARTTLS
    //       auth: {
    //         user: smtp.user,
    //         pass: smtp.pass,
    //       },
    //     },
    //     defaults: {
    //       from: smtp.from,
    //     },
    //     template: {
    //       dir: resolve(__dirname, 'templates'),
    //       adapter: new HandlebarsAdapter(),
    //     },
    //   };
    // },
    // }),
    ContentsModule,
    UsersModule,
    AuthModule,
    MetasModule,
    CommentsModule,
    RelationshipsModule,
  ],
})
export class AppModule {}
