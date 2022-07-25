import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    // quando o usuário acessar a rota, executa uma função para requisitar o modulo
    // execucao sob demanda
    loadChildren: () =>
      import('./home/home.module').then((modulo) => modulo.HomeModule), //promise vai conter um modulo com nome HomeModule
  },
  {
    path: 'animais',
    loadChildren: () =>
      import('./animais/animais.module').then((modulo) => modulo.AnimaisModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
