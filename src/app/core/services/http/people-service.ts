import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Person} from '@models/person';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {peopleEndpoint} from '../endpoints/people.endpoint';
import {IPerson} from '@models/IPerson';
import {NotificationService} from '@services/utils/notification-service';


@Injectable({
  providedIn: 'root'
})
export class PeopleService implements ICrudeable<Person> {
  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  getAll(): Observable<ApiResponseCollection<Person>> {
    return this.http.get<ApiResponseCollection<Person>>(environment.apiUrlV1 + peopleEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Person): Observable<ApiResponse<Person>> {
    return this.http.post<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.create, entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  update(entity: Person): Observable<ApiResponse<Person>> {
    return this.http.put<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.update.replace(':id',entity.id!.toString()), entity) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  delete(id: number): Observable<ApiResponse<Person>> {
    return this.http.delete<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.delete.replace(':id', id.toString())) .pipe(
      tap(() => {
        this.notification.showSuccessNotification();
      }),
      catchError(() => {
        this.notification.showErrorNotification();
        return of();
      }),
    );
  }
  search(entity : string ,query: string): Observable<ApiResponseCollection<IPerson>> {
    const url = peopleEndpoint.search
      .replace(':entity', entity)
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<IPerson>>(environment.apiUrlV1 + url,{}) .pipe(
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
