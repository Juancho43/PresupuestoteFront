import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/utils/auth-service';
import { inject } from '@angular/core';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => true);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, false);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TOKEN)) {
    const authService = inject(AuthService);
    const accessToken = authService.getToken();
    if (accessToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next(authRequest);
    }
    return next(req);
  }
  return next(req);
};
