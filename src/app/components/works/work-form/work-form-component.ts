import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {WorkService} from '@services/http/work-service';
import {AddMaterialsToWorkRequest, Work, WorkRequest} from '@models/work';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Material} from '@models/material';
import {ItemCard} from '@components/items/item-card/item-card';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';

@Component({
  selector: 'app-work-form',
  imports: [
    ReactiveFormsModule,
    ItemCard,
  ],
  templateUrl: './work-form-component.html',
  styleUrl: './work-form-component.scss'
})

export class WorkFormComponent implements OnInit {
  private service = inject(WorkService);
  private confirmationService = inject(ConfirmationDialogService);
  readonly id = input(0);
  readonly budgetId = input.required<number>();

  isEdit = signal<boolean>(false);
  item = input<Material>({} as Material);
  materialList = signal<Material[]>([]);

  selectedItem = output<Material>();
  submitted = output<Material[]>();


  WorkForm: FormGroup = new FormGroup({
    budgetId: new FormControl(0, Validators.required),
    order: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    deadLine: new FormControl(new Date(), Validators.required),
    state: new FormControl('', Validators.required),
    hours: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  workResource = rxResource({
    params: () => {
      return {id: this.id()}
    },
    stream: ({params}) => {
      if (params.id > 0) return this.service.getById(params.id);
      return of({} as ApiResponse<Work>);
    }
  })

  statesResource = rxResource({
    stream: () => {
      return this.service.getStates();
    }
  })





  constructor() {
    effect(() => {
      this.workResource.value();
      this.onEditHandler();
    });

    effect(() => {
      // Only react to item changes and add to materialsList if item has an id
      const newItem = this.item();
      if (newItem && newItem.id) {
        this.materialList.update((items) => {
          const existingItem = items.find(i => i.id === newItem.id);
          if (!existingItem) {
            return [...items, newItem];
          } else {
            // Update existing item
            const index = items.findIndex(i => i.id === newItem.id);
            items[index] = newItem;
          }
          return items;
        });
      }
    });
  }


  ngOnInit() {
    this.WorkForm.get('budgetId')?.setValue(this.budgetId());
    this.WorkForm.get('budgetId')?.disable();
  }

  setUp() {
    this.WorkForm.reset();
    this.materialList.set([]);
    this.isEdit.set(false);
  }



  onEditHandler() {
    if(this.id()>0){
      this.isEdit.set(true);
      if(!this.workResource.isLoading()) this.setForm(this.workResource.value()!.data!)

    }
  }

  setForm(data : Work) {
    this.WorkForm.patchValue({
      budgetId: this.budgetId(),
      order: data.order,
      name: data.name,
      notes: data.notes,
      deadLine: data.dead_line,
      estado: data.state || 'Presupuestado',
      hours: data.estimated_time
    })
    this.materialList.set(data.materials || []);
  }

  onSubmit() {
    if (!this.isEdit()) {
      this.service.create(this.toWork()).subscribe( response => {
        if(response.success) {
          this.submitMaterials(response.data!.id!, this.materialList());
        }
      })

    } else {
      this.service.update(this.toWork()).subscribe(response => {
          if(response.success) {
            this.submitMaterials(response.data!.id!, this.materialList());
          }
        }
      )
    }


    this.setUp();
  }



  toWork(): WorkRequest {
    return {
      id: this.isEdit() ? this.id()! : undefined,
      budget_id: this.WorkForm.get('budgetId')?.value,
      name: this.WorkForm.get('name')?.value,
      order: this.WorkForm.get('order')?.value,
      notes: this.WorkForm.get('notes')?.value,
      dead_line: this.WorkForm.get('deadLine')?.value,
      state: this.WorkForm.get('state')?.value,
      estimated_time: this.WorkForm.get('hours')?.value
    };
  }

  deleteItem(item: Material) {
    this.materialList.update((items) => {
      return items.filter(i => i.id !== item.id);
    })
  }

  submitMaterials(workId : number,materials: Material[]) {
    const addMaterialsToWorkRequest: AddMaterialsToWorkRequest = {
      work_id: workId,
      materials: materials.map(material => ({ id: material.id!, quantity: material.quantity || 1 }))
    }
    this.service.addMaterial(addMaterialsToWorkRequest).subscribe();
  }

  onDelete() {
    const result = this.confirmationService.openDialog('¿Está seguro de que desea eliminar este trabajo?');
    result.afterClosed().subscribe(result =>{
      if (result) {
        this.service.delete(this.workResource.value()?.data?.id!).subscribe({
          next: () => {
            this.confirmationService.navigateTo('/budget/detail/' + this.budgetId());
          }
        });
      }
    })
  }
}

