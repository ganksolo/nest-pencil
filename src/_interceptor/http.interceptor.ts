import { 
  CallHandler, 
  ExecutionContext, 
  Injectable, 
  NestInterceptor,
  BadGatewayException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
		.handle()
		.pipe(
			map(data => {
				return {
					code: 200,
					data,
					msg: '请求成功！'
				}
			})
		)
  }
}
