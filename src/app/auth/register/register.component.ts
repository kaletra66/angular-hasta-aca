import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Salvador', [ Validators.required, Validators.minLength(1) ]],
    email: ['franciscokoi4@gmail.com', [ Validators.required, Validators.email ]],
    password: ['koikoikoi', [ Validators.required ]],
    password2: ['koikoikoi.', [ Validators.required ]],
    terminos: [true, [ Validators.required ]],
  }, {
    Validators : this.passwordIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
              private usuarioServide: UsuariosService) { }

  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      console.log("Formulario Válido");
    }else{
      console.log("Formulario NO Válido");
    }

    //Creación de usuario
    this.usuarioServide.crearUsuario(this.registerForm.value)
      .subscribe( resp => {
        console.log("Usuario creado");
        console.log(resp);
      }, (err) => {
        console.warn(err.error.msg);
        Swal.fire("Error", err.error.msg, 'error');
      })
      
  }

  campoValidado( campo: string):boolean{
    if( this.registerForm.get(campo)?.invalid && this.formSubmitted ){
      return true;      
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas(){
    const pass = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass !== pass2) && this.formSubmitted ){
      return true;
    }else{
      return false;
    }
  }

  passwordIguales(pass:string, pass2:string){
    return ( formGroup: FormGroup ) => {
      const passControl = formGroup.get(pass);
      const pass2Control = formGroup.get(pass2);

      if(passControl?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual: true})
      }

    }
  }
}
