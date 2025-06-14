import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '@core/interfaces/ApiResponseCollection';

@Component({
  selector: 'app-pagination-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-buttons.html',
  styleUrl: './pagination-buttons.scss'
})
export class PaginationButtons {
  pagination = input<Pagination>({} as Pagination);
  pageChange = output<number>();

  onPreviousPage(): void {
    if (this.pagination().current_page > 1) {
      this.pageChange.emit(this.pagination().current_page - 1);
    }
  }

  onNextPage(): void {
    if (this.pagination().has_more_pages) {
      this.pageChange.emit(this.pagination().current_page + 1);
    }
  }
}
