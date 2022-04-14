import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from '../config/configuration';
import { UsersModule } from './modules/users/users.module';
import { CategoryModule } from './modules/categories/category.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ContentsModule } from './modules/contents/contents.module';
import { LinksModule } from './modules/links/links.module';
import { HistoryModule } from './modules/histories/history.module';
import { TagsModule } from './modules/tags/tags.module';
import { WorksModule } from './modules/works/works.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { ExternalModule } from './modules/external/external.module';
import { SiteModule } from './modules/site/site.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SmtpModule } from './modules/smtp/smtp.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { resolve } from 'path';
// import { OptionsModule } from './modules/options/options.module';

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
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const smtp = configService.get('smtp');
        return {
          transport: {
            host: smtp.host,
            port: smtp.port,
            secure: true, // upgrade later with STARTTLS
            auth: {
              user: smtp.user,
              pass: smtp.pass,
            },
          },
          defaults: {
            from: smtp.from,
          },
          template: {
            dir: resolve(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
          },
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
    SmtpModule,
    // OptionsModule,
  ],
})
export class AppModule {}
