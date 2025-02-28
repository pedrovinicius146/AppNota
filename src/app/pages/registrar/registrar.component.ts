import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Registrar.component.html',
  styleUrls: ['./Registrar.component.css']
})
export class RegistrarComponent {
  registroForm: FormGroup;

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}')]],
      idade: ['', [Validators.required, Validators.min(1)]],
      matricula: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Formulário válido?', this.registroForm.valid);
  
    Object.keys(this.registroForm.controls).forEach(field => {
      const control = this.registroForm.get(field);
      console.log(`Campo: ${field}, Válido? ${control?.valid}, Erros:`, control?.errors);
    });
  
    if (this.registroForm.valid) {
      console.log('Dados Registrados:', this.registroForm.value);
      alert('Registro concluído com sucesso!');
      this.registroForm.reset();
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
  formatarCPF(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{2})$/, '$1-$2');
  
    this.registroForm.controls['cpf'].setValue(valor, { emitEvent: false });
  }
  
  
}
