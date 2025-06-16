import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Client} from '@core/interfaces/entities/client';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../interfaces/ApiResponse';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {clientEndpoint} from '../endpoints/clients.endpoint';
import {Payment} from '@models/payment';
import {paymentEndpoint} from '../endpoints/payments.endpoint';


@Injectable({
  providedIn: 'root'
})
export class ClientService implements ICrudeable<Client> {
    private http = inject(HttpClient);

    getAll(page: number = 1): Observable<ApiResponseCollection<Client>> {
      return this.http.get<ApiResponseCollection<Client>>(
        `${environment.apiUrlV1}${clientEndpoint.paginate}${page}`
      );
    }
    getById(id: number): Observable<ApiResponse<Client>> {
        return this.http.get<ApiResponse<Client>>(environment.apiUrlV1 + clientEndpoint.getById.replace(':id', id.toString()));
    }
    create(entity: Client): Observable<ApiResponse<Client>> {
      return this.http.post<ApiResponse<Client>>(environment.apiUrlV1 + clientEndpoint.create, entity);
    }
    update(entity: Client): Observable<ApiResponse<Client>> {
      return this.http.put<ApiResponse<Client>>(environment.apiUrlV1 + clientEndpoint.update.replace(':id',entity.id!.toString()), entity);
    }
    delete(id: number): Observable<ApiResponse<Client>> {
      return this.http.delete<ApiResponse<Client>>(environment.apiUrlV1 + clientEndpoint.delete.replace(':id', id.toString()));
    }

    getPayments(id: number): Observable<ApiResponseCollection<Payment>> {
      return this.http.get<ApiResponseCollection<Payment>>(environment.apiUrlV1 + paymentEndpoint.byClient.replace(':id', id.toString()));
    }
}
