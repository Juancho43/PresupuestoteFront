import {Component, inject} from '@angular/core';
import {AuthService} from '@services/utils/auth-service';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-logout-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './logout-form-component.html',
  standalone: true,
  styleUrl: './logout-form-component.scss'
})
export class LogoutFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logoutForm = new FormGroup({
    confirmation: new FormControl(false, [Validators.required]),
  });

  logout() {
    if (this.logoutForm.get('confirmation')?.value) {
      this.authService.sendLogout().subscribe((res) => {
        if (res.success) {
          this.authService.logout();
          this.router.navigateByUrl('/home');
        }
      });
    }
  }
}
