import {Component, inject, signal} from '@angular/core';
import {MaterialListComponent} from '@components/items/materials/material-list/material-list';
import {CategoryListComponent} from '@components/items/categories/category-list/category-list';
import {SubcategoryListComponent} from '@components/items/subcategories/subcategory-list/subcategory-list';
import {MaterialService} from '@services/http/material-service';
import {SubcategoryService} from '@services/http/subcategory-service';
import {CategoryService} from '@services/http/category-service';
import {MeasureService} from '@services/http/measure-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {MeasureListComponent} from '@components/items/measures/measure-list-component/measure-list';

@Component({
  selector: 'app-material-view',
  standalone : true,
  imports: [
    MaterialListComponent,
    CategoryListComponent,
    SubcategoryListComponent,
    MeasureListComponent
  ],
  templateUrl: './material-view-component.html',
  styleUrl: './material-view-component.scss'
})
export class MaterialViewComponent {

  private service = inject(MaterialService);
  private subcategoryService = inject(SubcategoryService);
  private categoryService = inject(CategoryService);
  private measureService = inject(MeasureService);

  materialPage = signal(1);
  subcategoryPage = signal(1);
  categoryPage = signal(1);
  measurePage = signal(1);


  materialResource = rxResource({
    params : () => {return{ page: this.materialPage()}},
    stream : ({params}) => this.service.getAll(params.page),
  })
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
