import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {AddMaterialsToWorkRequest, Work, WorkRequest} from '@models/work';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {workEndpoint} from '../endpoints/works.endpoint';
import {BudgetState} from '@models/budget';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class WorkService implements ICrudeable<Work, WorkRequest> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getAll(page: number = 1): Observable<ApiResponseCollection<Work>> {
    return this.http.get<ApiResponseCollection<Work>>(
      `${environment.apiUrlV1}${workEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Work>> {
    return this.http.get<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: WorkRequest): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: WorkRequest): Observable<ApiResponse<Work>> {
    return this.http.put<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.update.replace(':id',entity.id!.toString()), entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  delete(id: number): Observable<ApiResponse<Work>> {
    return this.http.delete<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  addMaterial(request : AddMaterialsToWorkRequest): Observable<ApiResponse<Work>> {
    return this.http.post<ApiResponse<Work>>(environment.apiUrlV1 + workEndpoint.addMaterial, request) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  getStates(): Observable<ApiResponse<BudgetState>> {
    return this.http.get<ApiResponse<BudgetState>>(environment.apiUrlV1 + workEndpoint.getStates);
  }
  search(query: string): Observable<ApiResponseCollection<Work>> {
    const url = workEndpoint.search + query;
    return this.http.post<ApiResponseCollection<Work>>(environment.apiUrlV1 + url,{}) .pipe(
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
