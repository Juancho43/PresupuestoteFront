import {Component, inject} from '@angular/core';
import {LoadingService} from '@services/utils/loading-service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  private LoadingService = inject(LoadingService);
    isLoading = this.LoadingService.loading;
}
