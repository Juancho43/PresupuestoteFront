import {Component, input} from '@angular/core';
import {Client} from '../../../core/interfaces/entities/client';

@Component({
  selector: 'app-client',
  imports: [],
  templateUrl: './client-component.html',
  styleUrl: './client-component.scss'
})
export class ClientComponent {
  readonly client = input.required<Client>();
}
