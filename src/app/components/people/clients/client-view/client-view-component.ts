import {Component, inject, input, signal} from '@angular/core';
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
  page = signal(1);
  clientsResource = rxResource({
    params : () => {return{page : this.page()}},
    stream :({params}) => {
      return this.service.getAll(params.page);
    }
  })

  onFormSubmitted() {
    this.clientsResource.reload();
  }

}
