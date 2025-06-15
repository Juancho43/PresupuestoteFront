import {Component, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '@models/category';
import {SubcategoryService} from '@services/http/subcategory-service';
import {SubCategoryRequest} from '@models/subcategory';

@Component({
  selector: 'app-subcategory-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './subcategory-form.html',
  styleUrl: './subcategory-form.scss'
})
export class SubcategoryForm {
  readonly selectedCategory = input<Category>({id : 0} as Category);
  private service = inject(SubcategoryService);

  isEditing = signal(false);
  SubCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl(0, Validators.required),
  });
  constructor() {
    effect(() => {
      if (this.selectedCategory()) {
        this.SubCategoryForm.get('category')?.setValue(this.selectedCategory()!.id);
      }
    });
  }

  setUp() {
    this.SubCategoryForm.reset();
    this.isEditing.set(false);
  }
    onSubmit() {
      if (!this.isEditing()) {
        this.service.create(this.toSubcategory()).subscribe()
      } else {
        this.service.update(this.toSubcategory()).subscribe()
      }
      this.setUp();
    }

    resetForm($event: MouseEvent) {
      this.setUp();
      $event.preventDefault();
    }

    toSubcategory(): SubCategoryRequest {
    return {
        name: this.SubCategoryForm.get('name')?.value,
        category_id: this.SubCategoryForm.get('category')?.value,
        id: this.selectedCategory().id
      }
    }
}
