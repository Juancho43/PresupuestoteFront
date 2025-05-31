import {Observable} from 'rxjs';
import {ApiResponseCollection} from '../../interfaces/ApiResponseCollection';
import {ApiResponse} from '../../interfaces/ApiResponse';

export interface ICrudeable<Entity> {
  getAll() : Observable<ApiResponseCollection<Entity>>
  getById(id: number) : Observable<ApiResponse<Entity>>
  create(entity: Entity) : Observable<ApiResponse<Entity>>
  update(entity: Entity) : Observable<ApiResponse<Entity>>
  delete(id: number) : Observable<ApiResponse<Entity>>
}
