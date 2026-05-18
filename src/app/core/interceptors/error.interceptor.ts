import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toast: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => {
        console.log('API REQUEST SUCCESS')
      }),

      catchError(
        (error: HttpErrorResponse) => {
          console.error(
            'API Error:', error
          );

          this.toast.show(
            'Something went wrong'
          );
          return throwError(
            () => error
          )

        }
      )
    )
  }
}
