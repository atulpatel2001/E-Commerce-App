import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  
  /**
   * Handle User Data and call api throw services for register user
   */
  async handleRegister(): Promise<void> {
    try {
      const response = await this.authService.register(
        this.name,
        this.email,
        this.password,
        this.phone
      );
      console.log('Registration Successful:', response);
      this.router.navigate(['/products']);
    } catch (error) {
      console.error('Registration Failed:', error);
      this.errorMessage = 'Registration failed. Please try again.';
    }
  }
}
