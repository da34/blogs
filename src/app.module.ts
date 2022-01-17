import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { User } from './users/entities/user.entity';
import { Content } from './contents/entities/content.entity';
import { Tag } from './tags/entities/tag.entity';
import { Link } from './links/entities/link.entity';
import { Log } from './logs/entities/log.entity';
import { Class } from './classify/entities/classify.entity';
import { Option } from './options/entities/option.entity';
import { Work } from './works/entities/work.entity';
import { Comment } from './comments/entities/comment.entity';
import { UsersModule } from './users/users.module';
import { ClassifyModule } from './classify/classify.module';
import { CommentsModule } from './comments/comments.module';
import { ContentsModule } from './contents/contents.module';
import { LinksModule } from './links/links.module';
import { LogsModule } from './logs/logs.module';
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
        entities: [User, Content, Tag, Class, Link, Log, Option, Work, Comment],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'), //根据实体自动创建数据库表， 生产环境建议关闭
        timezone: '+08:00', //服务器上配置的时区
        // autoLoadEntities: true, // 自动加载实体
      }),
    }),
    UsersModule,
    ClassifyModule,
    CommentsModule,
    ContentsModule,
    LinksModule,
    LogsModule,
    OptionsModule,
    TagsModule,
    WorksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
