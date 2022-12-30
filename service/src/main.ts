import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception-filter.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { MikroORM } from '@mikro-orm/core';

const PORT = process.env.APP_PORT || 7001;
const PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();

  app.setGlobalPrefix(PREFIX);

  //开启CORS
  app.enableCors();

  // 添加代理，以获得正确的ip
  app.set('trust proxy', 1);

  // 防止跨站脚本攻击
  app.use(helmet());

  // 压缩
  app.use(compression());

  // 请求限制
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1分钟
      max: 100, // 限制每个IP每个窗口100个请求
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
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(PREFIX, app, document);

  await app.listen(PORT, () => {
    // console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    Logger.log(`服务已经启动,接口请访问:http://localhost:${PORT}/${PREFIX}`);
  });
}
bootstrap();
