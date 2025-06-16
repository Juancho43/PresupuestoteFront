import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {finalize} from 'rxjs';
import {LoadingService} from '@services/utils/loading-service';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const service = inject(LoadingService);
  service.show();

  return next(req).pipe(
    finalize(() => service.hide())
  );
};
