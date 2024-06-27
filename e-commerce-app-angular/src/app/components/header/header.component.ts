import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { CookieServices } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,private authService:AuthService,private tostService:NgToastService) {}

  // token:string=''
        isLogin:boolean=false

 ngOnInit(): void {
      this.isLogin = this.authService.isLoggedIn();

}
  handleLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.tostService.success({
      detail: 'Success',
      summary: "Successfully Logout!!!!!! ",
      duration: 3000
    })
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
