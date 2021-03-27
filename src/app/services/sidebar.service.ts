import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    { 
      titulo : "Comienzo",
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo:'Dashboard',
          url: '/'
        },
        {
          titulo:'ProgresBar',
          url: 'progress'
        },
        {
          titulo:'Graficas',
          url: 'grafical'
        },
      ]
    }
  ]

  constructor() { }
}
