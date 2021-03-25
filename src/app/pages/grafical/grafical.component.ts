import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafical',
  templateUrl: './grafical.component.html',
  styles: [
  ]
})
export class GraficalComponent implements OnInit {

  public labels1: string[] = ['Uno', 'Dos', 'Tres'];
  public data1 = [
    [350, 450, 100],
  ];

  public labels2: string[] = ['Uno2', 'Dos2', 'Tres2'];
  public data2 = [
    [10, 30, 50],
  ];

  public labels3: string[] = ['Uno', 'Dos', 'Tres'];
  public data3 = [
    [350, 450, 100],
  ];

  public labels4: string[] = ['Uno', 'Dos', 'Tres'];
  public data4 = [
    [350, 450, 100],
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
