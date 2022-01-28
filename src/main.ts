import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception-filter.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { csrfMiddleware } from './common/middleware/csrf.middleware.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const PORT = process.env.PORT || 7001;
const PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const csrfProtection = csrf();
  //
  // // 注册csrf
  // app.use(cookieParser());
  // app.use(csrfProtection);

  app.setGlobalPrefix(PREFIX);
  // 注册中间件
  // app.use(csrfMiddleware);

  // 添加代理，以获得正确的ip
  app.set('trust proxy', 1);

  // 防止跨站脚本攻击
  app.use(helmet());

  // 请求限制
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1分钟
      max: 10, // 限制每个IP每个窗口10个请求
    }),
  );

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
  SwaggerModule.setup(PREFIX, app, document);

  await app.listen(PORT, () => {
    Logger.log(
      `服务已经启动,接口请访问:http://wwww.localhost:${PORT}/${PREFIX}`,
    );
  });
}
bootstrap();
