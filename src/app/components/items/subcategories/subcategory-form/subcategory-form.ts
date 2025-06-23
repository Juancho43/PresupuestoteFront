import {Component, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '@models/category';
import {SubcategoryService} from '@services/http/subcategory-service';
import {Subcategory, SubCategoryRequest} from '@models/subcategory';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';

@Component({
  selector: 'app-subcategory-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './subcategory-form.html',
  styleUrl: './subcategory-form.scss'
})
export class SubcategoryForm {
  private service = inject(SubcategoryService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly selectedCategory = input<Category>({id : 0} as Category);
  readonly id = input<number>(0);
  isEditing = signal(false);
  SubCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl(0, Validators.required),
  });


  subcategoryResource = rxResource({
    params: () => ({id: this.id()}),
    stream: ({params}) => {
      if (this.id() > 0) {
        this.isEditing.set(true);
        return this.service.getById(params.id);
      }
      return of({} as ApiResponse<Subcategory>);
    },

  })

  constructor() {
    effect(() => {
      if (this.selectedCategory()) {
        this.SubCategoryForm.get('category')?.setValue(this.selectedCategory()!.id);
      }
    });
    effect(() => {
      this.subcategoryResource.value();
      this.onEditHandler();
    });
  }


    onSubmit() {
      if (!this.isEditing()) {
        this.service.create(this.toSubcategory()).subscribe()
      } else {
        this.service.update(this.toSubcategory()).subscribe()
      }
      this.setUp();
    }


    toSubcategory(): SubCategoryRequest {
    return {
        name: this.SubCategoryForm.get('name')?.value,
        category_id: this.SubCategoryForm.get('category')?.value,
        id: this.selectedCategory().id
      }
    }


  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este subrubro?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.subcategoryResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/material')
          }
        });
      }
    })
  }

  setUp() {
    this.SubCategoryForm.reset();
    this.isEditing.set(false);
  }

  private onEditHandler() {
    if(this.id()>0){
      this.isEditing.set(true);
      if(!this.subcategoryResource.isLoading()) this.setForm(this.subcategoryResource.value()!.data!)

    }
  }

  private setForm(param : Subcategory) {
    this.SubCategoryForm.patchValue({
      name: param.name,
      category: param.category.id
    });
  }
}
