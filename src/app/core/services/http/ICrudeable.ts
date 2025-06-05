import {Observable} from 'rxjs';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {ApiResponse} from '../../interfaces/ApiResponse';

export interface ICrudeable<Entity, EntityRequest = Entity> {
  getAll() : Observable<ApiResponseCollection<Entity>>
  getById(id: number) : Observable<ApiResponse<Entity>>
  create(entity: EntityRequest) : Observable<ApiResponse<Entity>>
  update(entity: EntityRequest) : Observable<ApiResponse<Entity>>
  delete(id: number) : Observable<ApiResponse<Entity>>
}
