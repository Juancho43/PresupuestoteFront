import {Component, inject, input} from '@angular/core';
import {PersonListComponent} from '@components/people/person-list-component/person-list-component';
import {ClientService} from '@services/http/client-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientFormComponent} from '../client-form-component/client-form-component';

@Component({
  selector: 'app-client-view',
  standalone: true,
  imports: [
    PersonListComponent,
    ClientFormComponent
  ],
  templateUrl: './client-view-component.html',
  styleUrl: './client-view-component.scss'
})
export class ClientViewComponent {
  private service = inject(ClientService);
  readonly id = input(0);

  clientsResource = rxResource({
    stream :() => {
      return this.service.getAll();
    }
  })

  onFormSubmitted() {
    this.clientsResource.reload();
  }

}
