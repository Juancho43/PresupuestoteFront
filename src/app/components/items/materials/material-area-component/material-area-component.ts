import { Component } from '@angular/core';
import {MaterialFormComponent} from '@components/items/materials/material-form-component/material-form-component';
import {CategoryFormComponent} from '@components/items/categories/category-form-component/category-form-component';
import {
  SubcategoryFormComponent
} from '@components/items/subcategories/subcategory-form-component/subcategory-form-component';
import {MeasureFormComponent} from '@components/items/measures/measure-form-component/measure-form-component';

@Component({
  selector: 'app-material-area',
  imports: [
    MaterialFormComponent,
    CategoryFormComponent,
    SubcategoryFormComponent,
    MeasureFormComponent
  ],
  templateUrl: './material-area-component.html',
  styleUrl: './material-area-component.scss'
})
export class MaterialAreaComponent {

}
