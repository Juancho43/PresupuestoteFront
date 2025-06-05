import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Person} from '../../interfaces/Entities/person';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {peopleEndpoint} from '../endpoints/people.endpoint';
import {IPerson} from '../../interfaces/Entities/IPerson';


@Injectable({
  providedIn: 'root'
})
export class PeopleService implements ICrudeable<Person> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Person>> {
    return this.http.get<ApiResponseCollection<Person>>(environment.apiUrlV1 + peopleEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Person): Observable<ApiResponse<Person>> {
    return this.http.post<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.create, entity);
  }
  update(entity: Person): Observable<ApiResponse<Person>> {
    return this.http.put<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Person>> {
    return this.http.get<ApiResponse<Person>>(environment.apiUrlV1 + peopleEndpoint.delete.replace(':id', id.toString()));
  }
  search(entity : string ,query: string): Observable<ApiResponseCollection<IPerson>> {
    const url = peopleEndpoint.search
      .replace(':entity', entity)
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<IPerson>>(environment.apiUrlV1 + url,{});
  }

}
