import { FormGroup } from "@angular/forms";

//rece o formulário inteiro
export function usuarioSenhasIguaisValidator(formGroup: FormGroup) {
  // caso o elemento nao existe, sera passado string em branco
  const username = formGroup.get('userName')?.value ?? '';
  const password = formGroup.get('password')?.value ?? '';

  if (username.trim() + password.trim()) {
    return username !== password ? null : { senhaIgualUsuario: true };
  } else {
    return null;
  }
}
