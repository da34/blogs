import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();
    let message = exceptionRes?.['message'] || exception.message;

    // 处理message
    if (Array.isArray(message) && message.length === 1) {
      message = message.join();
    }

    console.log(JSON.stringify(exception.getResponse()));
    response.status(status).json({
      message,
      code: -1,
    });
  }
}
