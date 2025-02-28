import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent {
  cidade = '';
  estado = '';
  nome = '';
  cpf = '';
  idade: number | null = null;
  matricula = '';

  notasVisiveis = false;
  mensagemErro = '';

  estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  notas = [8.5, 7.0, 9.2, 6.8]; // Simulação de notas do aluno

  verificarDados() {
    if (!this.cidade || !this.estado || !this.nome || !this.cpf || !this.idade || !this.matricula) {
      this.mensagemErro = 'Preenchimento incorreto. Por favor, preencha todos os campos.';
      this.notasVisiveis = false;
      return;
    }

    if (this.validarCPF(this.cpf)) {
      this.mensagemErro = '';
      this.notasVisiveis = true;
    } else {
      this.mensagemErro = 'Dados incorretos. Verifique o CPF.';
      this.notasVisiveis = false;
    }
  }

  validarCPF(cpf: string): boolean {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }
}
