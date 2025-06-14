import {Component, inject} from '@angular/core';
import {NavigationService} from '@services/utils/navigation-service';

@Component({
  selector: 'app-navigation-buttons',
  imports: [],
  templateUrl: './navigation-buttons.html',
  styleUrl: './navigation-buttons.scss'
})
export class NavigationButtons {
  private service = inject(NavigationService);

  canGoBack(): boolean {
    return this.service.canGoBack();
  }

  canGoForward(): boolean {
    return this.service.canGoForward();
  }

  goBack(): void {
    this.service.back();
  }
  goForward(): void {
    this.service.forward();
  }
}
