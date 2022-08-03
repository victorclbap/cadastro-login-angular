import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

//Indica que pode ser injetado em outra dependencia
@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  // normalmente retorna apenas o body
  // precisamos tipar httpresponse, e adicionar observe:response para receber o header
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient
      .post(
        `${API}/user/login`,
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
        // alem de fazer requisição faz operação com tap
        tap((res) => {
          const authToken = res.headers.get('x-access-token') ?? '';
          this.usuarioService.salvaToken(authToken);
        })
      );
  }
}
