import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  saveCookie(key: string, value: string) {
    setCookie(key, value, { expires: 365, path: '/' });
  }

  getCookie(cookie: string) {
    return getCookie(cookie);
  }

  removeCookie(cookie: string) {
    removeCookie(cookie);
  }
}
