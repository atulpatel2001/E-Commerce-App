import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CookieServices {

    constructor(private cookieService: CookieService) { }
    private tokenSubject = new BehaviorSubject<string>(this.cookieService.get("token"));


    token$ = this.tokenSubject.asObservable();
    getCookie(): string {
      return this.cookieService.get("token");
    }

  }

