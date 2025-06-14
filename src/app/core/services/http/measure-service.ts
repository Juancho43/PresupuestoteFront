import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Measure} from '@models/measure';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {measureEndpoint} from '../endpoints/measures.endpoint';
import {IPerson} from '@models/IPerson';
import {peopleEndpoint} from '@services/endpoints/people.endpoint';
import {Subcategory} from '@models/subcategory';
import {subcategoryEndpoint} from '@services/endpoints/subcategories.endpoint';


@Injectable({
  providedIn: 'root'
})
export class MeasureService implements ICrudeable<Measure> {
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Measure>> {
    return this.http.get<ApiResponseCollection<Measure>>(
      `${environment.apiUrlV1}${measureEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Measure>> {
    return this.http.get<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Measure): Observable<ApiResponse<Measure>> {
    return this.http.post<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.create, entity);
  }
  update(entity: Measure): Observable<ApiResponse<Measure>> {
    return this.http.put<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Measure>> {
    return this.http.get<ApiResponse<Measure>>(environment.apiUrlV1 + measureEndpoint.delete.replace(':id', id.toString()));
  }

  search(query: string): Observable<ApiResponseCollection<Measure>> {
    const url = measureEndpoint.search
      .replace(':query', query);
    return this.http.post<ApiResponseCollection<Measure>>(environment.apiUrlV1 + url,{});
  }

}
