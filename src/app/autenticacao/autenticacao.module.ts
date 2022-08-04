import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  // provider indica que toda requisição vai passar por
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      // multiplos interceptors
      multi: true,
    },
  ],
})
export class AutenticacaoModule {}
