import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

const routes: Routes = [
  {
    //path é '' pois considera a raiz da home
    // quando for a raiz home chamada, mostra o HomeComponent
    path: '',
    component: HomeComponent,
    // elemento de subrotas dentro de home
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'novousuario',
        component: NovoUsuarioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
