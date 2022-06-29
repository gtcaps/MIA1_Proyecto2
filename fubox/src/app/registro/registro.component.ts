import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  users:any;
  name:string;
  lastname:string;
  email:string;
  password:string;
  errorMessage:string;
  successMessage:string;


  constructor() {
    let datos: any = localStorage.getItem('users');
    this.users = JSON.parse(datos || "[]");

    this.name = "";
    this.lastname = "";
    this.email = "";
    this.password = "";
    this.errorMessage = "";
    this.successMessage = "";

  }

  ngOnInit(): void {
  }

  registerUser(): void {

    if (this.name.trim() === "" || this.lastname.trim() === "" || this.email.trim() === "" || this.password.trim() === "") {
      this.errorMessage = "Complete todos los datos!!!"
      return;
    }

    this.errorMessage = "";

    let newUser = {
      "name": this.name,
      "lastname": this.lastname,
      "email": this.email,
      "password": this.password
    }

    let existUser = this.users.findIndex((user: any) => user.email === newUser.email);
    console.log(existUser);
    if (existUser !== -1) {
      this.errorMessage = "El usuario ya se encuentra registrado";
      return;
    }

    this.errorMessage = "";
    this.successMessage = "Usuario Registrado";
    this.users.push(newUser);

    localStorage.setItem('users', JSON.stringify(this.users));

  }

}
