import {Component, inject} from '@angular/core';
import {Client} from '../../../core/interfaces/Entities/client';
import {Employee} from '../../../core/interfaces/Entities/employee';
import {PersonListComponent} from '../../shared/person-list-component/person-list-component';
import {IPerson} from '../../../core/interfaces/Entities/IPerson';
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


  client : Client = {
    id: 10,
    balance: 0,
    person : {
      id: 20,
      name: "Juan",
      last_name: "Bravo",
      email: 'string',
      phone_number: '2291 511335',
      address: 'string',
      dni: 'string',
      cuit: 'string',

    },

  }

  employee : Employee = {
    active: false,
    balance: 0,

    id: 11,
    person: {
      id: 21,
      name: 'pablo',
      last_name: 'picasso',
      email: 'string',
      phone_number: '223 23123233',
      address: 'string',
      dni: 'string',
      cuit: 'string',
    },


  }
  data : IPerson[] = [
    this.client,
    this.employee,
  ]

}
