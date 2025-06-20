import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {AddMaterialsToInvoiceRequest, Invoice, InvoiceRequest} from '@models/invoice';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {invoiceEndpoint} from '../endpoints/invoices.endpoint';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements ICrudeable<Invoice,InvoiceRequest> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getAll(page: number = 1): Observable<ApiResponseCollection<Invoice>> {
    return this.http.get<ApiResponseCollection<Invoice>>(
      `${environment.apiUrlV1}${invoiceEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.get<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: InvoiceRequest): Observable<ApiResponse<Invoice>> {
    return this.http.post<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: InvoiceRequest): Observable<ApiResponse<Invoice>> {
    return this.http.put<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.update.replace(':id',entity.id!.toString()), entity)
      .pipe(
        tap(() => {
          this.notification.showSuccessNotification();
        }),
        catchError(() => {
          this.notification.showErrorNotification();
          return of();
        }),
      );
  }
  delete(id: number): Observable<ApiResponse<Invoice>> {
    return this.http.delete<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  addMaterial(request : AddMaterialsToInvoiceRequest): Observable<ApiResponse<Invoice>> {
    return this.http.post<ApiResponse<Invoice>>(environment.apiUrlV1 + invoiceEndpoint.addMaterial, request)
      .pipe(
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
