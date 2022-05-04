import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = host.switchToHttp().getResponse();
    response.status(httpStatus);
    console.log(exception);

    if (exception instanceof HttpException) {
      return response.render('error', exception);
    } else {
      return response.render('error', {
        response: {
          statusCode: '500',
          error: 'Internal server error',
          message: 'Unknown error',
        },
      });
    }
  }
}
