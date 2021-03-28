import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { promise } from 'selenium-webdriver';
 
@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise(( resolve, reject ) => {
    //   if(false){
    //     resolve("Hola dedsde la promesa");
    //   }else{
    //     reject("MUERTO");
    //   }

    // });

    // promesa.then( ( mensaje ) => {
    //   console.log("Termine de ejecutar la promesa", mensaje);
    // })
    // .catch(error => console.log("Algo aslio mal", error));
    
    // console.log("Hola en el oninit");

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
  }

  getUsuarios(){
    
    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
        .then(
          response => response.json()
        )
        .then(
          body => resolve(body.data)
        )
    });

    return promesa;
  }

}
