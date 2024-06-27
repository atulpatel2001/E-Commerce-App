import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(private authService: AuthService, private router: Router,private tostService: NgToastService) {}



  /**
   * Handle User Data and call api throw services for register user
   */
  async handleRegister(): Promise<void> {
    try {
     await this.authService.register(
        this.name,
        this.email,
        this.password,
        this.phone
      ).then((data)=>{
        this.tostService.success( {
          detail: 'Success',
          summary: "Successfully Register",
          duration: 3000
        })
        this.router.navigate(['/products']);
      }).catch((err)=>{
        this.tostService.error( {
          detail: 'Error',
          summary: "Something Went Wrong!!!",
          duration: 3000
        })
      });

    } catch (error) {
      console.error('Registration Failed:', error);
      this.errorMessage = 'Registration failed. Please try again.';
      this.tostService.error( {
        detail: 'Error',
        summary: "Something Went Wrong!!!",
        duration: 3000
      })
    }
  }
}
