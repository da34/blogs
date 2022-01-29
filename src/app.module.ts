import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/category.module';
import { CommentsModule } from './comments/comments.module';
import { ContentsModule } from './contents/contents.module';
import { LinksModule } from './links/links.module';
import { HistoryModule } from './histories/history.module';
import { TagsModule } from './tags/tags.module';
import { WorksModule } from './works/works.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ExternalModule } from './external/external.module';
import { SiteModule } from './site/site.module';
import { ScheduleModule } from '@nestjs/schedule';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dataBase = configService.get('dataBase');
        return {
          type: 'mysql',
          host: dataBase.host,
          port: dataBase.port,
          username: dataBase.user,
          password: dataBase.pwd,
          database: dataBase.base,
          synchronize: dataBase.sync, //根据实体自动创建数据库表， 生产环境建议关闭
          timezone: '+08:00', //服务器上配置的时区
          autoLoadEntities: true, // 自动导入实体
          maxQueryExecutionTime: 1000, // 记录超过1秒的查询
        };
      },
    }),
    UsersModule,
    CategoryModule,
    CommentsModule,
    ContentsModule,
    LinksModule,
    HistoryModule,
    TagsModule,
    WorksModule,
    AuthModule,
    ExternalModule,
    SiteModule,
  ],
})
export class AppModule {}
