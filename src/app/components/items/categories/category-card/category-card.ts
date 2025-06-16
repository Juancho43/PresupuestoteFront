import {Component, input} from '@angular/core';
import {Category} from '@models/category';
import {CommonModule} from '@angular/common';
import {CardButtonComponent} from '@shared/card-button/card-button-component';

@Component({
  selector: 'app-category-card',
  imports: [CommonModule, CardButtonComponent],
  templateUrl: './category-card.html',
  standalone: true,
  styleUrl: './category-card.scss'
})
export class CategoryCardComponent {
  readonly category = input.required<Category>();
  readonly route = input.required<string>();
}
