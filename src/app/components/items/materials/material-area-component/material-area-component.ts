import {Component, computed, inject, signal} from '@angular/core';
import {MaterialForm} from '@components/items/materials/material-form/material-form';
import {CategoryForm} from '@components/items/categories/category-form/category-form';
import {SubcategoryForm} from '@components/items/subcategories/subcategory-form/subcategory-form';
import {MeasureForm} from '@components/items/measures/measure-form/measure-form';
import {SubcategoryListComponent} from '@components/items/subcategories/subcategory-list/subcategory-list';
import {CategoryListComponent} from '@components/items/categories/category-list/category-list';
import {MeasureListComponent} from '@components/items/measures/measure-list-component/measure-list';
import {SubcategoryService} from '@services/http/subcategory-service';
import {CategoryService} from '@services/http/category-service';
import {MeasureService} from '@services/http/measure-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {Subcategory} from '@models/subcategory';
import {Category} from '@models/category';
import {Measure} from '@models/measure';

@Component({
  selector: 'app-material-area',
  imports: [
    MaterialForm,
    CategoryForm,
    SubcategoryForm,
    MeasureForm,
    SubcategoryListComponent,
    CategoryListComponent,
    MeasureListComponent
  ],
  templateUrl: './material-area-component.html',
  styleUrl: './material-area-component.scss'
})
export class MaterialAreaComponent {
  private subcategoryService = inject(SubcategoryService);
  private categoryService = inject(CategoryService);
  private measureService = inject(MeasureService);

  subcategoryPage = signal(1);
  categoryPage = signal(1);
  measurePage = signal(1);

  selectedSubcategory = signal<Subcategory>({name:'Seleccione un sub-rubro'} as Subcategory);
  selectedCategory = signal<Category>({name:'Seleccione un rubro'} as Category);
  selectedMeasure = signal<Measure>({name: 'Seleccione una unidad de medida'} as Measure);

  openForm = signal<'material' | 'category' | 'subcategory' | 'measure' | ''>("material");
  showMaterialForm = computed(() => this.openForm() === 'material');
  showCategoryForm = computed(() => this.openForm() === 'category');
  showSubcategoryForm = computed(() => this.openForm() === 'subcategory');
  showMeasureForm = computed(() => this.openForm() === 'measure');


  subcategoryResource = rxResource({
    params : () => {return{ page: this.subcategoryPage()}},
    stream : ({params}) => this.subcategoryService.getAll(params.page),
  })
  categoryResource = rxResource({
    params : () => {return{ page: this.categoryPage()}},
    stream : ({params}) => this.categoryService.getAll(params.page),
  })
  measureResource = rxResource({
    params : () => {return{ page: this.measurePage()}},
    stream : ({params}) => this.measureService.getAll(params.page),
  })
}
