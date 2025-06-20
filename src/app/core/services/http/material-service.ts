import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Material, MaterialRequest} from '@models/material';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {materialEndpoint} from '../endpoints/materials.endpoint';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class MaterialService implements ICrudeable<Material, MaterialRequest> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getAll(page: number = 1): Observable<ApiResponseCollection<Material>> {
    return this.http.get<ApiResponseCollection<Material>>(
      `${environment.apiUrlV1}${materialEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: MaterialRequest): Observable<ApiResponse<Material>> {
    return this.http.post<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: MaterialRequest): Observable<ApiResponse<Material>> {
    return this.http.put<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.update.replace(':id',entity.id!.toString()), entity)
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
  delete(id: number): Observable<ApiResponse<Material>> {
    return this.http.delete<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  search(query: string): Observable<ApiResponseCollection<Material>> {
    const url = materialEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Material>>(environment.apiUrlV1 + url,{}) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  getByIdWithWorks(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.works.replace(':id', id.toString()));
  }
  getByIdWithInvoices(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.invoices.replace(':id', id.toString()));
  }
  getByIdWithStocks(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.stocks.replace(':id', id.toString()));
  }
  getByIdWithPrices(id: number): Observable<ApiResponse<Material>> {
    return this.http.get<ApiResponse<Material>>(environment.apiUrlV1 + materialEndpoint.prices.replace(':id', id.toString()));
  }
}
