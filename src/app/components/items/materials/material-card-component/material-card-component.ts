import {Component, input} from '@angular/core';
import {Material} from '@models/material';

@Component({
  selector: 'app-material-card',
  imports: [],
  templateUrl: './material-card-component.html',
  styleUrl: './material-card-component.scss'
})
export class MaterialCardComponent {
  readonly material = input.required<Material>();
}
