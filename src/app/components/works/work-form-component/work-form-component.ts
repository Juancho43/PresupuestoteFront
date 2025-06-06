import {Component, inject, input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {WorkService} from '@services/http/work-service';
import {Work, WorkRequest} from '@models/work';

@Component({
  selector: 'app-work-form',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './work-form-component.html',
  styleUrl: './work-form-component.scss'
})
export class WorkFormComponent implements OnInit {
  private service = inject(WorkService);
  budgetId = input.required<number>();
  isEdit = signal<boolean>(false);
  WorkForm: FormGroup = new FormGroup({
    budgetId: new FormControl(0, Validators.required),
    order: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    deadLine: new FormControl(new Date(), Validators.required),
    estado: new FormControl('Presupuestado', Validators.required),
    hours: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  ngOnInit() {
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

  onSubmit() {
    if (!this.isEdit()) {
      this.service.create(this.toWork()).subscribe()

    } else {
      this.service.update(this.toWork()).subscribe()
    }
    // this.submitted.emit(true);
    this.setUp();
  }
  toWork():WorkRequest{
   return {
      budget_id: this.WorkForm.get('budgetId')?.value,
      name: this.WorkForm.get('name')?.value,
      order: this.WorkForm.get('order')?.value,
      notes: this.WorkForm.get('notes')?.value,
      dead_line: this.WorkForm.get('deadLine')?.value,
      state: this.WorkForm.get('estado')?.value,
      estimated_time: this.WorkForm.get('hours')?.value
   };
  }

}
