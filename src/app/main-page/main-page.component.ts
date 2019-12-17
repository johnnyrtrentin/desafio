import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authetication.service';

@Component({
  selector: 'app-manipulate-list',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  public token: any;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getTokenAccess();
  }

  getTokenAccess() {
    this.auth.doAuthentication('johnny.trentin@desafiofluig.com', 'Johnny@123').subscribe(response => {
      this.token = Object.values(response)[0];
    });
  }

  cancel(){}

  teste() {
    console.log(this.token);
  }

}
