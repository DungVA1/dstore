import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch()
export class RpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    console.log('--------------', exception)
    return super.catch(exception, host);
  }
}
