import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Measure} from '@models/measure';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {measureEndpoint} from '../endpoints/measures.endpoint';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class MeasureService implements ICrudeable<Measure> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getAll(page: number = 1): Observable<ApiResponseCollection<Measure>> {
    return this.http.get<ApiResponseCollection<Measure>>(
      `${environment.apiUrlV1}${measureEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Measure>> {
    return this.http.get<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Measure): Observable<ApiResponse<Measure>> {
    return this.http.post<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: Measure): Observable<ApiResponse<Measure>> {
    return this.http.put<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.update.replace(':id',entity.id!.toString()), entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  delete(id: number): Observable<ApiResponse<Measure>> {
    return this.http.delete<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }

  search(query: string): Observable<ApiResponseCollection<Measure>> {
    const url = measureEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Measure>>(environment.apiUrlV1 + url,{}) .pipe(
      tap((response) => {
        if( response.message !== 'No results found for your search') {
          this.notification.showSuccessNotification();
        }else{
          this.notification.showErrorNotification('No se encontraron resultados para la búsqueda');
        }
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }

}
