import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { usuarioSenhasIguaisValidator } from './usuario-senhas-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css'],
})
export class NovoUsuarioComponent implements OnInit {
  // form reativo, diferente do de login que é do tipo template
  // atributo que representa o estado do formulario
  // ! indica que pode ser nulo ou não
  novoUsuarioForm!: FormGroup;

  // formbuilder = serviço do angular
  // injetando serviço do angular e o criado por mim
  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private UsuarioExisteService: UsuarioExisteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // group = metodo que gera um objeto
    // dentro descre como serão os elementos do formulario
    this.novoUsuarioForm = this.formBuilder.group(
      {
        // mesmos nomes de atributos da interface
        // segundo array é de validações
        // angular tem classe de validações prontas
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        // validacao assincrona é na terceita posicao do array
        userName: [
          '',
          [minusculoValidator],
          [this.UsuarioExisteService.usuarioJaExiste()],
        ],
        password: [''],
      },
      {
        validators: [usuarioSenhasIguaisValidator],
      }
    );
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
