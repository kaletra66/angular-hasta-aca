import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form-interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public email:string = "";
  public remember:boolean = false;
  public auth2:any;

  public loginForm = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]],
    remember: [false],
  });

  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioSerivice: UsuariosService,
              private ngZone:NgZone) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("remember") || "";
    if(this.email.length > 1){
      this.remember = true;
    }
    this.renderButton();
  }

  login(){
    this.usuarioSerivice.login( this.loginForm.value)
      .subscribe( resp => {
        //Mover al dashboard
        console.log("Mover al dashboard");
        this.ngZone.run( () =>{
          this.router.navigateByUrl('/');
        })
      }, (err) => {
        Swal.fire("Error", err.error.msg, 'error');
      })
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp() {
    await this.usuarioSerivice.googleInit();
    this.auth2 = this.usuarioSerivice.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element:any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser:any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          this.usuarioSerivice.loginGoogle( id_token )
          .subscribe( resp => {
            //Mover al dashboard
            console.log("Mover al dashboard");
            this.ngZone.run( () =>{
              // this.router.navigateByUrl('/');
            })
          });
        }, (error:any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
