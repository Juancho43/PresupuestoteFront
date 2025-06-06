import {Component, HostListener, inject, signal} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {AuthService} from '../../../core/services/utils/auth-service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.scss'
})
export class Navbar{
  private authService = inject(AuthService);
  hide = signal(true);
  session = signal(false);
  private readonly SMALL_WIDTH_THRESHOLD = 767; // Define the small width threshold

  constructor() {

    this.session.set(this.authService.isLoggedIn());
    this.checkScreenWidth(); // Initial check on component creation
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth(): void {
    this.hide.set(window.innerWidth >= this.SMALL_WIDTH_THRESHOLD);
  }
  toggleMenu(){
    this.hide.set(!this.hide());
  }

}
