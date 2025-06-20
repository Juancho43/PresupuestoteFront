import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Category} from '@models/category';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {categoryEndpoint} from '../endpoints/categories.endpoint';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICrudeable<Category> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);
  getAll(page: number = 1): Observable<ApiResponseCollection<Category>> {
    return this.http.get<ApiResponseCollection<Category>>(
      `${environment.apiUrlV1}${categoryEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Category): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.create, entity)
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
  update(entity: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.update.replace(':id',entity.id!.toString()), entity)
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
  delete(id: number): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.delete.replace(':id', id.toString()))
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
  search(query: string): Observable<ApiResponseCollection<Category>> {
    const url = categoryEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Category>>(environment.apiUrlV1 + url,{})
      .pipe(
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
