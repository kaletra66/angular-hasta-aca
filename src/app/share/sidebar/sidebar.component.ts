import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[];
  public usuario!:Usuario;
  
  constructor(private sidebarService: SidebarService,
              private usuarioService: UsuariosService) {
    this.usuario = usuarioService.user;  
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

}
