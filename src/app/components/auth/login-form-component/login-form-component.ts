import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/utils/auth-service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-form-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form-component.html',
  standalone: true,
  styleUrl: './login-form-component.scss'
})
export class LoginFormComponent implements OnInit{
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value ?? '';
      const password = this.loginForm.get('password')?.value ?? '';
      this.authService.sendLogin({ email, password }).subscribe((res) => {
        if (res.success) {
          this.authService.login(res.data?.token!);
          this.router.navigateByUrl('/home');
        } else {
          alert('Login failed');
        }
      });
    }
  }
}
