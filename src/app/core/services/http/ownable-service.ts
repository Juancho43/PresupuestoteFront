import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ownableEndpoint} from '@services/endpoints/ownable';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {IOwnable} from '@models/IOwnable';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OwnableService {

  private http = inject(HttpClient);

  search(entity: string, query: string) {
    const url = environment.apiUrlV1+ownableEndpoint.search.replace(':entity', entity).replace(':query', query);
    return this.http.post<ApiResponseCollection<IOwnable>>(url,{});
  }


}
