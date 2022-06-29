import { Component, OnInit } from '@angular/core';
import * as data from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fubox';
  users:any = [];
  dir:any = (data as any).default;

  ngOnInit(): void {

    this.users.push({
      "name": 'admin',
      "lastname": 'admin',
      "email": 'admin',
      "password": 'admin'
    });

    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('dir', JSON.stringify(this.dir));

  }

}
