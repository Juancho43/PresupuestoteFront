import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Payment} from '@models/payment';
import {ICrudeable} from '@services/http/ICrudeable';
import {paymentEndpoint} from '@services/endpoints/payments.endpoint';
import {NotificationService} from '@services/utils/notification-service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements ICrudeable<Payment>{
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getAll(page: number = 1): Observable<ApiResponseCollection<Payment>> {
    return this.http.get<ApiResponseCollection<Payment>>(
      `${environment.apiUrlV1}${paymentEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Payment>> {
    return this.http.get<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Payment): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: Payment): Observable<ApiResponse<Payment>> {
    return this.http.put<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.update.replace(':id',entity.id!.toString()), entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  delete(id: number): Observable<ApiResponse<Payment>> {
    return this.http.delete<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }

}
