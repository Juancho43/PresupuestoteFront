import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '@services/http/category-service';
import {Category} from '@models/category';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {
  private service = inject(CategoryService);
  isEditing = signal(false);

  CategoryForm: FormGroup = new FormGroup({
    idCategory: new FormControl(),
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toCategory()).subscribe()
    } else {
      this.service.update(this.toCategory()).subscribe()
    }
    // this.setUp();
  }

  toCategory() : Category{
      return {
        id: this.CategoryForm.get('idCategory')?.value,
        name: this.CategoryForm.get('name')?.value
      }
  }
  resetForm($event: MouseEvent) {
    // this.setUp();
    $event.preventDefault();
  }

}
