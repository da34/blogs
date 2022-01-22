import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception-filter.filter';
import { ValidationPipe } from '@nestjs/common';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { csrfMiddleware } from './common/middleware/csrf.middleware.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const csrfProtection = csrf({
    cookie: true,
  });

  // 注册csrf
  app.use(cookieParser());
  app.use(csrfProtection);

  app.setGlobalPrefix('api');
  // 注册中间件
  app.use(csrfMiddleware);

  // 注册响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('博客接口')
    .setDescription('博客接口Api文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(7001);
  // console.log('api 接口地址: http://127.0.0.1:7001/api/#');
}
bootstrap();
