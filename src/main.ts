import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('博客接口')
    .setDescription('博客接口Api文档')
    .setVersion('1.0')
    // .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 注册响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 注册错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(7001);
}
bootstrap();
