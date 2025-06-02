import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {AuthService} from '../../../core/services/utils/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  hide : boolean = true;
  session : boolean = false;

  ngOnInit() {
    this.authService.login$.subscribe((res) =>{
      this.session = res;
    });
  }
  toggleMenu(){
    this.hide = !this.hide;
  }

}
