import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private tostService:NgToastService,private router:Router) {}

  name = '';
  email = '';
  message = '';

  onSubmit() {
    this.tostService.success({
      detail: 'Success',
      summary: "Thanks For Contact Our team Connect With You!!!!!! ",
      duration: 3000
    })
    this.router.navigate(['/'])
  }
}
