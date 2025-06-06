import {Component, input} from '@angular/core';
import {Subcategory} from '@models/subcategory';
import {CommonModule} from '@angular/common';
import {CardButtonComponent} from '@shared/card-button-component/card-button-component';

@Component({
  selector: 'app-subcategory-card',
  imports: [CommonModule, CardButtonComponent],
  templateUrl: './subcategory-card.html',
  standalone: true,
  styleUrl: './subcategory-card.scss'
})
export class SubcategoryCardComponent {
  readonly subcategory = input.required<Subcategory>();
  readonly route = input.required<string>();
}
