import {Component, computed, signal} from '@angular/core';
import {MaterialForm} from '@components/items/materials/material-form/material-form';
import {CategoryForm} from '@components/items/categories/category-form/category-form';
import {SubcategoryForm} from '@components/items/subcategories/subcategory-form/subcategory-form';
import {MeasureForm} from '@components/items/measures/measure-form/measure-form';

@Component({
  selector: 'app-material-area',
  imports: [
    MaterialForm,
    CategoryForm,
    SubcategoryForm,
    MeasureForm
  ],
  templateUrl: './material-area-component.html',
  styleUrl: './material-area-component.scss'
})
export class MaterialAreaComponent {

  openForm = signal<'material' | 'category' | 'subcategory' | 'measure' | ''>('');
  showMaterialForm = computed(() => this.openForm() === 'material');
  showCategoryForm = computed(() => this.openForm() === 'category');
  showSubcategoryForm = computed(() => this.openForm() === 'subcategory');
  showMeasureForm = computed(() => this.openForm() === 'measure');

}
