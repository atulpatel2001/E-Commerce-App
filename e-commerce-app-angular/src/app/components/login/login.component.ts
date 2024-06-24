import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async handleLogin(): Promise<void> {
    try {
      console.log(this.email+this.password)
      const response = await this.authService.loginUser(this.email, this.password);
      console.log('Login Successful:', response);
      this.router.navigate(['/products']);
    } catch (error) {
      console.error('Login Failed:', error);
      this.errorMessage = 'Login failed. Please check your credentials.';
    }
  }
}import { Comment } from '@angular/compiler';
import { CommonModule } from '@angular/common';

