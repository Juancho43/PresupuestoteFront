import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Price} from '../../interfaces/entities/price';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {priceEndpoint} from '../endpoints/prices.endpoint';


@Injectable({
  providedIn: 'root'
})
export class PriceService implements ICrudeable<Price> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Price>> {
    return this.http.get<ApiResponseCollection<Price>>(environment.apiUrlV1 + priceEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Price>> {
    return this.http.get<ApiResponse<Price>>(environment.apiUrlV1 + priceEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Price): Observable<ApiResponse<Price>> {
    return this.http.post<ApiResponse<Price>>(environment.apiUrlV1 + priceEndpoint.create, entity);
  }
  update(entity: Price): Observable<ApiResponse<Price>> {
    return this.http.put<ApiResponse<Price>>(environment.apiUrlV1 + priceEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Price>> {
    return this.http.get<ApiResponse<Price>>(environment.apiUrlV1 + priceEndpoint.delete.replace(':id', id.toString()));
  }

}
