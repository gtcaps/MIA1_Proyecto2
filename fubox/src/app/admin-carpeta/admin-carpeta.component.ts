import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-admin-carpeta',
  templateUrl: './admin-carpeta.component.html',
  styleUrls: ['./admin-carpeta.component.scss']
})
export class AdminCarpetaComponent implements OnInit {

  dataFolder:any;
  stringTree:string;

  constructor(private route:Router) {
    this.stringTree = "";
  }

  ngOnInit(): void {
    let userLoged = this.getUserLoged();
    console.log(`->${userLoged}<-`);
    this.redirectUser(userLoged);

    // Obtener data
    fetch('http://127.0.0.1:3030/data')
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.dataFolder = response;
      this.treeRecursive(this.dataFolder, '');
    });
  }

  private treeRecursive(folder: any, ident: string):void {
    if (folder === null || folder === undefined) {
      return;
    }

    console.log(`${ident}${folder.name}`);
    this.stringTree += `${ident}${folder.name} \n`;

    folder.folders.forEach((folder: any) => {
      this.treeRecursive(folder, ident + ' ');
    });

  }

  private getUserLoged(): string {
    let userLoged = "";
    let cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      let cookieSplit = cookie.trim().split('=');
      if (cookieSplit[0] === 'loged') {
        userLoged = cookieSplit[1].trim();
      }
    });

    return userLoged;
  }

  private redirectUser(user: string): void {
    if (user !== 'admin') {
      this.route.navigate(['/access-denied']);
    }
  }

}
