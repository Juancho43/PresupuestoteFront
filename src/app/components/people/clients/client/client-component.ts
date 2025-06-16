import {Component, input} from '@angular/core';
import {Client} from '@models/client';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './client-component.html',
  styleUrl: './client-component.scss'
})
export class ClientComponent {
  readonly client = input.required<Client>();
}
