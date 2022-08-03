import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { LoginGuard } from './autenticacao/login.guard';

const routes: Routes = [
  {
    path: '',
    // retira os espaços p/ validar
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    // quando o usuário acessar a rota, executa uma função para requisitar o modulo
    // execucao sob demanda
    loadChildren: () =>
      import('./home/home.module').then((modulo) => modulo.HomeModule), //promise vai conter um modulo com nome HomeModule
    canLoad: [LoginGuard],
  },
  {
    path: 'animais',
    loadChildren: () =>
      import('./animais/animais.module').then((modulo) => modulo.AnimaisModule),
    canLoad: [AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
