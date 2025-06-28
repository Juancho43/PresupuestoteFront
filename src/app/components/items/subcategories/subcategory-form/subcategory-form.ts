import {Component, inject, input, linkedSignal, OnInit} from '@angular/core';
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
export class SubcategoryForm implements OnInit {
  private service = inject(SubcategoryService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly selectedCategory = input<Category>({id : 0} as Category);
  readonly id = input<number>(0);
  isEditing= linkedSignal(()=>{
    return this.id() > 0;
  });

  SubCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });


  subcategoryResource = rxResource({
    params: () => ({id: this.id()}),
    stream: ({params}) => {
      if (this.isEditing()) {
        return this.service.getById(params.id);
      }
      return of({} as ApiResponse<Subcategory>);
    },

  })

  category = linkedSignal<Category>(() => {
    if (this.selectedCategory() !== undefined && this.selectedCategory()?.id!> 0) {
      return this.selectedCategory()!;
    }
    if(!this.subcategoryResource.isLoading() && this.isEditing()){
      return this.subcategoryResource.value()!.data!.category;
    }
    return {name:'Seleccione un rubro'} as Category;
  });


  ngOnInit() {
    this.checkAndSetForm();
  }

  private checkAndSetForm() {
    if (this.isEditing() && !this.subcategoryResource.isLoading() && this.subcategoryResource.value()) {
      this.setForm(this.subcategoryResource.value()!.data!);
    } else if (this.isEditing()) {
      setTimeout(() => this.checkAndSetForm(), 100);
    }
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
        category_id: this.category().id!,
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



  private setForm(param : Subcategory) {
    this.SubCategoryForm.patchValue({
      name: param.name,
    });
  }
}
