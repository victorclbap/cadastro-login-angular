import { AbstractControl } from '@angular/forms';

// control = campo que for implementado
export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;

  if (valor !== valor.toLowerCase()) {
    return { minusculo: true };
  } else {
    return null;
  }
}
