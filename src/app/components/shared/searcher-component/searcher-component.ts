import {Component, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-searcher-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './searcher-component.html',
  styleUrl: './searcher-component.scss'
})
export class SearcherComponent {
  clientSelected =output<number>();
  results = output<any[]>();
  sortedResults = output<any[]>();
  filtro = new FormControl('');
  busqueda = new FormControl('');
  idClient = new FormControl(0);
  // filteredClients: Client[] = [];
  /*
    ngOnInit() {
      this.clientService.getClients().subscribe({
        next : (clients) =>{
          this.filteredClients = clients;
        }
      })
    }
  */
  sort() {
    // let sorted: Client[] = [];
    /*switch (this.filtro.value) {
      case 'alfabeticamente':
        sorted = lodash.orderBy(
          this.clients.map((client) => ({
            ...client,
            oPerson: {
              ...client.oPerson,
              lastName: client.oPerson.lastName.toLowerCase(),
            },
          })),
          ['oPerson.lastName'],
          ['asc']
        );
        break;
      case 'alfabeticamente2':
        sorted = lodash.orderBy(
          this.clients.map((client) => ({
            ...client,
            oPerson: {
              ...client.oPerson,
              lastName: client.oPerson.lastName.toLowerCase(),
            },
          })),
          ['oPerson.lastName'],
          ['desc']
        );
        break;
      case 'dni':
        sorted = lodash.orderBy(this.clients, ['oPerson.dni'], ['asc']);
        break;
      default:
        sorted = lodash.orderBy(this.clients, ['oPerson.lastName'], ['asc']);
    }
    console.log(sorted);
    console.log('ordenado');
    this.filteredClients = sorted;*/
    // this.sortedResults.emit(this.filteredClients);
  }

  search() {
    console.log(this.busqueda.value);
    /*this.filteredClients = this.clients.filter(
      (client) =>
        client.oPerson.name
          .toLowerCase()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.lastName
          .toLowerCase()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.mail
          ?.toLowerCase()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.phoneNumber
          ?.toString()
          .includes(this.busqueda.value!.toLowerCase()) ||
        client.oPerson.dni
          ?.toString()
          .includes(this.busqueda.value!.toLowerCase())
    );
*/
    // this.sortedResults.emit(this.filteredClients);
  }
}
