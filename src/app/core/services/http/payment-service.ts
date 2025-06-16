import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Payment} from '@models/payment';
import {ICrudeable} from '@services/http/ICrudeable';
import {paymentEndpoint} from '@services/endpoints/payments.endpoint';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements ICrudeable<Payment>{
  private http = inject(HttpClient);

  getAll(page: number = 1): Observable<ApiResponseCollection<Payment>> {
    return this.http.get<ApiResponseCollection<Payment>>(
      `${environment.apiUrlV1}${paymentEndpoint.paginate}${page}`
    );
  }
  getById(id: number): Observable<ApiResponse<Payment>> {
    return this.http.get<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.getById.replace(':id', id.toString()));
  }
  create(entity: Payment): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.create, entity);
  }
  update(entity: Payment): Observable<ApiResponse<Payment>> {
    return this.http.put<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.update.replace(':id',entity.id!.toString()), entity);
  }
  delete(id: number): Observable<ApiResponse<Payment>> {
    return this.http.delete<ApiResponse<Payment>>(environment.apiUrlV1 + paymentEndpoint.delete.replace(':id', id.toString()));
  }
  // search(entity : string ,query: string): Observable<ApiResponseCollection<IPerson>> {
  //   const url = peopleEndpoint.search
  //     .replace(':entity', entity)
  //     .replace(':query', query);
  //   return this.http.post<ApiResponseCollection<IPerson>>(environment.apiUrlV1 + url,{});
  // }
}
