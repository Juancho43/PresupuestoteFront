import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MaterialComponent} from '@components/items/materials/material/material.component';
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

  materialResource = rxResource({
    stream : () => this.service.getAll(),
  })

  subcategoryResource = rxResource({
    stream : () => this.subcategoryService.getAll(),
  })
  categoryResource = rxResource({
    stream : () => this.categoryService.getAll(),
  })
  measureResource = rxResource({
    stream : () => this.measureService.getAll(),
  })
}
