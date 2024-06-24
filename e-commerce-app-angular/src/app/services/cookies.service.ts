import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CookieServices {

    constructor(private cookieService: CookieService) { }
  
    getCookie(): string {
      return this.cookieService.get("token");
    }

  }
  
  