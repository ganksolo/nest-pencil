import { ExceptionFilter, Catch, HttpStatus, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const msg = (exception as any)?.response?.message ?? exception.message;
		const status = exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const errorMsg = {
			code: 400,
			message: msg,
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url
		};

		response
			.status(status)
			.json(errorMsg);

		// // 设置返回的状态码、请求头、发送错误信息
		// response.status(status);
		// response.header('Content-Type', 'application/json; charset=utf-8');
		// response.send(errorMsg);

	}
}