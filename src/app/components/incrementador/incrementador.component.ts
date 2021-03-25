import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input('valor') progreso : number = 40;
  @Output() valorSalida : EventEmitter<number> = new EventEmitter();
  
  @Input() btnClass : string = 'btn-primary';

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarValor(valor: number){
    this.progreso = this.progreso + valor;
    this.progreso = (this.progreso > 100)?100:this.progreso;
    this.progreso  = (this.progreso < 0)?0:this.progreso;
    this.valorSalida.emit(this.progreso);
  }

  onChange(valor:number){
    valor = (valor > 100)?100:valor;
    valor  = (valor < 0)?0:valor;
    this.progreso = valor;
    this.valorSalida.emit(this.progreso);
  }
}
