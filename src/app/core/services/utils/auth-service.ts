import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {environment} from '../../../../environments/environment';
import {CookieService} from './cookie-service';
import {checkToken} from '../../guards/token.interceptor';
import {authEndpoint} from '../endpoints/auth.endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  login$ = new BehaviorSubject<boolean>(false);

  sendLogin(data: { email: string; password: string }) {
    return this.http.post<ApiResponse<{token:string,user : any}>>(environment.apiUrl + authEndpoint.login, data,
      {context: checkToken(),}
    );
  }

  sendLogout() {
    return this.http.post<ApiResponse<string>>(environment.apiUrl + authEndpoint.logout, {});
  }

  login(token: string) {
    this.saveToken(token);
    this.login$.next(true);
  }

  saveToken(token: string) {
    this.cookieService.saveCookie('token', token);
  }

  logout() {
    this.cookieService.removeCookie('token');
    this.login$.next(false);
  }

  getToken() {
    return this.cookieService.getCookie('token');
  }

  isLoggedIn() {
    if (this.getToken() !== undefined) {
      this.login$.next(true);
    } else {
      this.login$.next(false);
    }
    return this.login$.getValue();
  }
}
