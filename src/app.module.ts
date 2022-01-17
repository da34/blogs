import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { User } from './users/user.entity';
import { Content } from './contents/content.entity';
import { Tag } from './tag/tag.entity';
import { Link } from './links/link.entity';
import { Log } from './logs/log.entity';
import { Class } from './classify/class.entity';
import { Option } from './options/option.entity';
import { Work } from './work/work.entity';
import { Comment } from './comments/comments.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
