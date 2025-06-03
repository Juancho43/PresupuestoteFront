import {Component, inject} from '@angular/core';
import {PersonListComponent} from '../../shared/person-list-component/person-list-component';
import {ClientService} from '../../../core/services/http/client-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientFormComponent} from '../client-form-component/client-form-component';

@Component({
  selector: 'app-client-view',
  imports: [
    PersonListComponent,
    ClientFormComponent
  ],
  templateUrl: './client-view-component.html',
  styleUrl: './client-view-component.scss'
})
export class ClientViewComponent {
  private service = inject(ClientService);
  clientsResource = rxResource({
    stream :() => {
      return this.service.getAll();
    }
  })


}
