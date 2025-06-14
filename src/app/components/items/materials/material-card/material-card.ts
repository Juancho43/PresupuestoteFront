import {Component, input} from '@angular/core';
import {Material} from '@models/material';
import {CommonModule} from '@angular/common';
import {CardButtonComponent} from '@shared/card-button-component/card-button-component';

@Component({
  selector: 'app-material-card',
  imports: [CommonModule, CardButtonComponent],
  templateUrl: './material-card.html',
  standalone: true,
  styleUrl: './material-card.scss'
})
export class MaterialCardComponent {
  readonly material = input.required<Material>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
}
