import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private internalHistory: string[] = [];
  private currentIndex = -1;
  private isFirstNavigation = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.handleNavigation(event.url);
      });
  }

  private handleNavigation(url: string): void {
    // Skip if this is a programmatic navigation from our back/forward methods
    if (this.isNavigatingProgrammatically) {
      this.isNavigatingProgrammatically = false;
      return;
    }

    // Only track internal navigation (skip the first navigation when entering PWA)
    if (this.isFirstNavigation) {
      this.isFirstNavigation = false;
      this.internalHistory.push(url);
      this.currentIndex = 0;
    } else {
      // Remove any forward history when navigating to a new page
      this.internalHistory = this.internalHistory.slice(0, this.currentIndex + 1);
      this.internalHistory.push(url);
      this.currentIndex++;
    }
  }

  private isNavigatingProgrammatically = false;

  back(): void {
    if (this.canGoBack()) {
      this.currentIndex--;
      this.isNavigatingProgrammatically = true;
      this.router.navigate([this.internalHistory[this.currentIndex]]);
    }
  }

  forward(): void {
    if (this.canGoForward()) {
      this.currentIndex++;
      this.isNavigatingProgrammatically = true;
      this.router.navigate([this.internalHistory[this.currentIndex]]);
    }
  }

  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  canGoForward(): boolean {
    return this.currentIndex < this.internalHistory.length - 1;
  }

  // Get current navigation state for debugging
  getNavigationState() {
    return {
      history: this.internalHistory,
      currentIndex: this.currentIndex,
      canGoBack: this.canGoBack(),
      canGoForward: this.canGoForward()
    };
  }
}
