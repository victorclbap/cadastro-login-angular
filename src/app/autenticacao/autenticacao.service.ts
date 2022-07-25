import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

//Indica que pode ser injetado em outra dependencia
@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  // quando a requisicao completar, vai retornar o objeto que definir no observable
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        'http://localhost:3000/user/login',
        {
          userName: usuario,
          password: senha,
        },
        {
          // indica que não quer receber apenas o body mas o header tbm
          observe: 'response',
        }
      )
      .pipe(
        // tap faz operação
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.usuarioService.salvaToken(authToken);
        })
      );
  }
}
