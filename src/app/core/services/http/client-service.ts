import {inject, Injectable} from '@angular/core';
import {ICrudeable} from './ICrudeable';
import {Client} from '../../interfaces/Entities/client';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/ApiResponse';
import { ApiResponseCollection } from '../../interfaces/ApiResponseCollection';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {clientEndpoint} from '../endpoints/clients.endpoint';


@Injectable({
  providedIn: 'root'
})
export class ClientService implements ICrudeable<Client> {
    private http = inject(HttpClient);

    getAll(): Observable<ApiResponseCollection<Client>> {
       return this.http.get<ApiResponseCollection<Client>>(environment.apiUrl + clientEndpoint.getAll);
    }
    getById(id: number): Observable<ApiResponse<Client>> {
        return this.http.get<ApiResponse<Client>>(environment.apiUrl + clientEndpoint.getById.replace(':id', id.toString()));
    }
    create(entity: Client): Observable<ApiResponse<Client>> {
      return this.http.post<ApiResponse<Client>>(environment.apiUrl + clientEndpoint.create, entity);
    }
    update(entity: Client): Observable<ApiResponse<Client>> {
      return this.http.post<ApiResponse<Client>>(environment.apiUrl + clientEndpoint.update.replace(':id',entity.id!.toString()), entity);
    }
    delete(id: number): Observable<ApiResponse<Client>> {
      return this.http.get<ApiResponse<Client>>(environment.apiUrl + clientEndpoint.delete.replace(':id', id.toString()));
    }
}
