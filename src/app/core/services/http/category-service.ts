import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Category} from '../../interfaces/Entities/category';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {categoryEndpoint} from '../endpoints/categories.endpoint';


@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICrudeable<Category> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Category>> {
    return this.http.get<ApiResponseCollection<Category>>(environment.apiUrlV1 + categoryEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Category): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.create, entity);
  }
  update(entity: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(environment.apiUrlV1 + categoryEndpoint.delete.replace(':id', id.toString()));
  }

}
