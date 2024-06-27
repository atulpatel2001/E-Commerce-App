import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(private authService: AuthService, private router: Router, private cartService: CartService, private tostService: NgToastService) {

  }

  async handleLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    try {
      await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((data) => {
        this.router.navigate(['/products']);
        this.tostService.success({
          detail: 'Success',
          summary: "Successfully Login ",
          duration: 5000
        })

        this.cartService.saveCartToDatabase().subscribe(dbResponse => {
          // this.cartService.clearCart();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });

      }).catch((err) => {


        this.tostService.error({
          detail: 'Error',
          summary: "Credential is Wrong!!!",
          duration: 3000
        })


      });


    } catch (error) {
      this.errorMessage = 'Login failed. Please check your credentials.';
    }
  }
}
