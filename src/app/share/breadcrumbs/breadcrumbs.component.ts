import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{
  public titulo:string = "";
  public tituloSubs: Subscription;

  // constructor(private router:Router, private route: ActivatedRoute) {
  //   console.log(route.snapshot.children[0].data);
  constructor(private router:Router) {
    this.tituloSubs = this.getDatosRuta()
                          .subscribe(({titulo}) => {
                            this.titulo = titulo;
                            document.title = titulo;
                          });
  }
  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }

  getDatosRuta(){
    return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),
    ); 
  }
}
