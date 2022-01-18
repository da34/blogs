import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/category.module';
import { CommentsModule } from './comments/comments.module';
import { ContentsModule } from './contents/contents.module';
import { LinksModule } from './links/links.module';
import { HistoryModule } from './histories/history.module';
import { OptionsModule } from './options/options.module';
import { TagsModule } from './tags/tags.module';
import { WorksModule } from './works/works.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'), //根据实体自动创建数据库表， 生产环境建议关闭
        timezone: '+08:00', //服务器上配置的时区
        autoLoadEntities: true, // 自动导入实体
      }),
    }),
    UsersModule,
    CategoryModule,
    CommentsModule,
    ContentsModule,
    LinksModule,
    HistoryModule,
    OptionsModule,
    TagsModule,
    WorksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
