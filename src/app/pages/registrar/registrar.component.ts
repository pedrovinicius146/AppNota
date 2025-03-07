import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RegistroService } from '../../registro.service';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './Registrar.component.html',
  styleUrls: ['./Registrar.component.css']
})
export class RegistrarComponent {
  registroForm: FormGroup;

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  constructor(private fb: FormBuilder, private registroService: RegistroService) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}')]],
      idade: ['', [Validators.required, Validators.min(1)]],
      matricula: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      matematica:['',[Validators.required,Validators.max(10),Validators.min(0)]],
      estruturadedados:['',[Validators.required,Validators.max(10),Validators.min(0)]],
      algoritmos:['',[Validators.required,Validators.max(10),Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.registroService.registrar(this.registroForm.value).subscribe(
        (response: any) => {
          console.log('Registro bem-sucedido:', response);
          alert('Registro concluído com sucesso!');
          this.registroForm.reset();
        },
        (error: any) => {
          console.error('Erro ao registrar:', error);
          alert('Erro ao registrar. Tente novamente.');
        }
      );
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }

  formatarCPF(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    // Aplica formatação completa se houver 11 dígitos ou formata parcialmente
    if (valor.length === 11) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{2})$/, '$1-$2');
    }

    this.registroForm.controls['cpf'].setValue(valor, { emitEvent: false });
  }
}
