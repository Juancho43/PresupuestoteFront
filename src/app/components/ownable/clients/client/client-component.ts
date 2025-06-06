import {Component, input} from '@angular/core';
import {Client} from '@models/client';

@Component({
  selector: 'app-client',
  imports: [],
  templateUrl: './client-component.html',
  styleUrl: './client-component.scss'
})
export class ClientComponent {
  readonly client = input.required<Client>();
}
