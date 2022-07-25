import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { switchMap, map, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  // injeta o servico
  constructor(private novoUsuarioService: NovoUsuarioService) {}

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        //Faz a troca do fluxo da digitação para o fluxo da requisição
        // nomeUsuario = valor que o valueChanges está passandono input
        //SwitchMap recebe o que o usuario esta digitando e converte em requisição p/ o back end
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        // recebe resultado da requisição http
        // faz a troca de resultado
        map((usuarioExiste) =>
          usuarioExiste ? { usuarioExistente: true } : null
        ),
        // depois da requisição, fecha o observable
        first()
      );
    };
  }
}
