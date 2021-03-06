import { Routes, RouterModule } from "@angular/router";
import {NgModule} from '@angular/core'
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { GraficalComponent } from "./grafical/grafical.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { AuthGuard } from "../guards/auth.guard";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
    // Rutas protegidas
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            {path: '', component: DashboardComponent, data: {titulo:'Inicio'}},
            {path: 'progress', component: ProgressComponent, data: {titulo:'Progress'}},
            {path: 'grafical', component: GraficalComponent, data: {titulo:'Grafical'}},
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo:'Account'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo:'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo:'Rxjs (Observables)'}},
            {path: 'perfil', component: PerfilComponent, data: {titulo:'Perfil de Usuario'}},
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}