import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})

export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario:any;
  public imagenSubir!: File;

  constructor( private fb:FormBuilder,
                private usuarioService: UsuariosService,
                private fileUploadService:FileUploadService) {
                  this.usuario = usuarioService.user;
                }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
    .subscribe( resp => {
      console.log(resp);
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire("Guardado", "Se actualizaron los datos", "success");
    }, (err) => {
      console.log(err.error.msg);
      Swal.fire("Error", err.error.msg, "error");
    })
  }

  cambiarImagen( event:any ){
    console.log({usuario:this.usuario});
    console.log({imageUrl:this.usuario.imageUrl});

    const file:File = event.target.files[0];
    this.imagenSubir = file;
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.u_id)
    .then( img => {
      this.usuario.img = img 
      Swal.fire("Exito", "La imagen ha sido actualizada", "success");
    }).catch( error => {
      console.log(error);
      Swal.fire("Error", "No se pudo actualizar la imagen", "error");
    })
  }
  
  // cambiarImagen( file: File ){
  //   console.log(file);
  // }
}
