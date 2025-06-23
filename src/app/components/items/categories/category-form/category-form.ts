import {Component, effect, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '@services/http/category-service';
import {Category} from '@models/category';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {of} from 'rxjs';

@Component({
  selector: 'app-category-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.scss'
})
export class CategoryForm {
  private service = inject(CategoryService);
  private confirmationService = inject(ConfirmationDialogService);
  isEditing = signal(false);
  readonly id = input<number>(0)
  CategoryForm: FormGroup = new FormGroup({
    idCategory: new FormControl(),
    name: new FormControl('', Validators.required),
  });
  canSubmit: any;

  categoryResource = rxResource({
    params: () => ({id: this.id()}),
    stream: ({params}) => {
      if (this.id() > 0) {
        this.isEditing.set(true);
        return this.service.getById(params.id);
      }
      return of({} as ApiResponse<Category>);
    },

  });


  constructor() {
    effect(() => {
      this.categoryResource.value();
      this.onEditHandler();
    });
  }

  onSubmit() {
    if (!this.isEditing()) {
      this.service.create(this.toCategory()).subscribe()
    } else {
      this.service.update(this.toCategory()).subscribe()
    }
    this.setUp();
  }

  toCategory() : Category{
      return {
        id: this.CategoryForm.get('idCategory')?.value,
        name: this.CategoryForm.get('name')?.value
      }
  }



  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar esta categoria?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.categoryResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/material')
          }
        });
      }
    })
  }

  setUp() {
    this.CategoryForm.reset();
    this.isEditing.set(false);
  }

  private onEditHandler() {
    if(this.id()>0){
      this.isEditing.set(true);
      if(!this.categoryResource.isLoading()) this.setForm(this.categoryResource.value()!.data!)

    }
  }

  private setForm(param : Category) {
    this.CategoryForm.patchValue({
      name: param.name,

    });
  }
}
