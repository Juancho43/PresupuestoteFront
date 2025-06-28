import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '@services/utils/notification-service';
import {authEndpoint} from '../endpoints/auth.endpoint';
import {environment} from '../../../../environments/environment.development';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {User} from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getCurrentUser(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${environment.apiUrl}${authEndpoint.user}`)
      .pipe(
        tap(() => {
          this.notification.showSuccessNotification('User data fetched successfully');
        }),
        catchError((error) => {
          this.notification.showErrorNotification('Failed to fetch user data');
          return of(error);
        })
      );
  }
}
