import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from './usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // observable em que recebemos informações e podemos enviar tambem
  // BehavioSubject = Envia o ultimo dado que estava nele qdo tem subscribe, ele guarda dado
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT() {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    // sempre que aciona este metodo, todos que se inscreveram nesse servico recebe o usuario
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    // elementos de fora da classe nao podem manipular o behavior subject
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string) {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout() {
    this.tokenService.excluiToken();
    // notifica todos que agora nao tem usuario nenhum
    this.usuarioSubject.next({});
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
