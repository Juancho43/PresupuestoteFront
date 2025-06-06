import {Component, input} from '@angular/core';
import {Material} from '@models/material';

@Component({
  selector: 'app-material',
  imports: [],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent {
  readonly material = input.required<Material>()
}
