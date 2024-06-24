import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieServices } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,private cookiesService:CookieServices,private authService:AuthService) {}

  token:string=this.cookiesService.getCookie();
 // isLogin:boolean=this.authService.IsLoggedIn();
  

  handleLogout(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.router.navigateByUrl(this.router.url);
  }
}
