import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Stock} from '../../interfaces/Entities/stock';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {stockEndpoint} from '../endpoints/stocks.endpoint';


@Injectable({
  providedIn: 'root'
})
export class StockService implements ICrudeable<Stock> {
  private http = inject(HttpClient);

  getAll(): Observable<ApiResponseCollection<Stock>> {
    return this.http.get<ApiResponseCollection<Stock>>(environment.apiUrlV1 + stockEndpoint.getAll);
  }
  getById(id: number): Observable<ApiResponse<Stock>> {
    return this.http.get<ApiResponse<Stock>>(environment.apiUrlV1 + stockEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Stock): Observable<ApiResponse<Stock>> {
    return this.http.post<ApiResponse<Stock>>(environment.apiUrlV1 + stockEndpoint.create, entity);
  }
  update(entity: Stock): Observable<ApiResponse<Stock>> {
    return this.http.post<ApiResponse<Stock>>(environment.apiUrlV1 + stockEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Stock>> {
    return this.http.get<ApiResponse<Stock>>(environment.apiUrlV1 + stockEndpoint.delete.replace(':id', id.toString()));
  }

}
