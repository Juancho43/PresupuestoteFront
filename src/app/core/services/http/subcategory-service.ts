import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Subcategory, SubCategoryRequest} from '@models/subcategory';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {subcategoryEndpoint} from '../endpoints/subcategories.endpoint';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService implements ICrudeable<Subcategory,SubCategoryRequest> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getAll(page: number = 1): Observable<ApiResponseCollection<Subcategory>> {
    return this.http.get<ApiResponseCollection<Subcategory>>(
      `${environment.apiUrlV1}${subcategoryEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.get<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: SubCategoryRequest): Observable<ApiResponse<Subcategory>> {
    return this.http.post<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: SubCategoryRequest): Observable<ApiResponse<Subcategory>> {
    return this.http.put<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.update.replace(':id',entity.id!.toString()), entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );

  }
  delete(id: number): Observable<ApiResponse<Subcategory>> {
    return this.http.delete<ApiResponse<Subcategory>>(environment.apiUrlV1 + subcategoryEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  search(query: string): Observable<ApiResponseCollection<Subcategory>> {
    const url = subcategoryEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Subcategory>>(environment.apiUrlV1 + url,{}) .pipe(
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
