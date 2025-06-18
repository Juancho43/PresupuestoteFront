import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {WorkService} from '@services/http/work-service';
import {AddMaterialsToWorkRequest, Work, WorkRequest} from '@models/work';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ApiResponse} from '@core/interfaces/ApiResponse';
import {Material} from '@models/material';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-work-form',
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './work-form-component.html',
  styleUrl: './work-form-component.scss'
})

export class WorkFormComponent implements OnInit {
  private service = inject(WorkService);
  readonly id = input(0);

  budgetId = input.required<number>();
  isEdit = signal<boolean>(false);
  work = input<Work>({order : 0} as Work);

  WorkForm: FormGroup = new FormGroup({
    budgetId: new FormControl(0, Validators.required),
    order: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    deadLine: new FormControl(new Date(), Validators.required),
    state: new FormControl('Presupuestado', Validators.required),
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

  bufferWork = signal<Work>({
    materials: [],
    order: 0,
    name: '',
    notes: '',
    cost: 0,
    state: '',
    estimated_time: 0,
    dead_line: new Date(),
  });

  item = input<Material>({} as Material);
  materialList = signal<Material[]>([]);
  selectedItem = output<Material>();
  submitted = output<Material[]>();

  constructor() {
    effect(() => {
      const currentWork = this.work();
      if (currentWork && currentWork.order > 0) this.onEdit();
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
    if (!this.workResource.isLoading()) this.bufferWork.set(this.workResource.value()!.data!);
    this.bufferWork.set({name: ""} as Work)

    this.WorkForm.get('budgetId')?.setValue(this.budgetId());
    this.WorkForm.get('budgetId')?.disable();
  }

  setUp() {
    this.WorkForm.reset();
    this.isEdit.set(false);
  }

  resetForm($Event: Event) {
    this.setUp();
    $Event.preventDefault();
  }

  onEdit() {
    this.isEdit.set(true);
    this.WorkForm.get('budgetId')?.setValue(this.budgetId);
    this.bufferWork.set(this.work());
    this.materialList.set(this.work().materials || []);
    this.toForm();
  }

  toForm() {
    this.WorkForm.patchValue({
      budgetId: this.budgetId(),
      order: this.bufferWork().order,
      name: this.bufferWork().name,
      notes: this.bufferWork().notes,
      deadLine: this.bufferWork().dead_line,
      estado: this.bufferWork().state || 'Presupuestado',
      hours: this.bufferWork().estimated_time
    })
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
      id: this.isEdit() ? this.work().id : undefined,
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

}

