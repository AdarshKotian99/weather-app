import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  city !: string;
  constructor(route:ActivatedRoute) {
    console.log('inside not found ts');
    route.queryParams.subscribe((params) =>{
      this.city = params['city'];
    });
   }
}
