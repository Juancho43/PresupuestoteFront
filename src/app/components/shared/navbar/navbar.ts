import {Component, effect, inject, signal} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {AuthService} from '@services/utils/auth-service';
import {NgClass} from '@angular/common';
import {NavigationButtons} from '@shared/navigation-buttons/navigation-buttons';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule, NgClass, NavigationButtons],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.scss'
})
export class Navbar{
  private authService = inject(AuthService);
  hide = signal(false);
  session = signal(false);

  constructor() {
    effect(() => {
      this.session.set(this.authService.isLoggedIn());
    })

  }

  toggleMenu(){
    this.hide.set(!this.hide());
  }

}
