import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage: string = '';
  isLoggedIn: boolean = false; // Flag to track login status

  constructor(private authService: AuthService, private router: Router,private cartService: CartService) {
    this.isLoggedIn = this.authService.IsLoggedIn(); // Assuming implemented
  }

  async handleLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    try {
      const response = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password);
      console.log('Login Successful:', response);
      this.cartService.saveCartToDatabase(response._id).subscribe(dbResponse => {
      
        this.cartService.clearCart();
        this.router.navigate(['/']);
      });
      this.router.navigate(['/products']);
    } catch (error) {
      this.errorMessage = 'Login failed. Please check your credentials.';
    }
  }
}
