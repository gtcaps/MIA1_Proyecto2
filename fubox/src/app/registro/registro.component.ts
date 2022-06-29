import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  users:any;
  name:string = "";


  constructor() {
    let datos: any = localStorage.getItem('users');
    this.users = JSON.parse(datos || "[]");



  }

  ngOnInit(): void {
  }

}
