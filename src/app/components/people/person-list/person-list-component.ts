import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {IPerson} from '@models/IPerson';
import {IPersonCardComponent} from '@components/people/person-card/i-person-card.component';
import {SearcherComponent} from '@components/people/searcher/searcher-component';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';
import {Pagination} from '@core/interfaces/ApiResponseCollection';
import {ConfirmationDialogService} from '@services/utils/confirmation-dialog-service';

@Component({
  selector: 'app-person-list',
  imports: [
    IPersonCardComponent,
    SearcherComponent,
    CommonModule,
    RouterLink,
    PaginationButtons,
  ],
  templateUrl: './person-list-component.html',
  standalone: true,
  styleUrl: './person-list-component.scss'
})
export class PersonListComponent implements OnInit {

  private confirmationService = inject(ConfirmationDialogService);
  readonly data = input.required<IPerson[]>();
  readonly pagination = input.required<Pagination>()
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
  readonly action = input.required<string>();
  readonly option = input.required<boolean>();
  changePage = output<number>();
  delete = output<number>();
  selectedPerson = output<IPerson>()
  personList = signal<IPerson[]>([]);
  paginationData = signal<Pagination>({} as Pagination);
  ngOnInit() {
    this.personList.set(this.data());
    this.paginationData.set(this.pagination());
  }
  handleResults(results: IPerson[]) {
    if(results.length > 0) this.personList.set(results);
    if(results.length == 0) this.personList.set(this.data());
  }


  handleDelete($event: number) {
    const dialog = this.confirmationService.openDialog(
      `¿Estás seguro de eliminar este ${this.entity()}?`
    );

    dialog.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.delete.emit($event);
        }
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
      }
    });
  }
}
