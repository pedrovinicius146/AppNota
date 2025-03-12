import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { RegistroService } from '../../registro.service'; 

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
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

  idAluno: number | null = null;
  notas: any = {}; // Objeto para armazenar as notas associadas ao ID

  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 
    'SP', 'SE', 'TO'
  ];

  constructor(private registroService: RegistroService) {}

  verificarDados() {
    // 1) Verificação de campos vazios
    if (
      !this.cidade.trim() || 
      !this.estado.trim() || 
      !this.nome.trim() || 
      !this.cpf.trim() || 
      this.idade === null || 
      !this.matricula.trim()
    ) {
      this.mensagemErro = 'Preenchimento incorreto. Por favor, preencha todos os campos.';
      this.notasVisiveis = false;
      return;
    }

    // 2) Validação do CPF
    if (!this.validarCPF(this.cpf.trim())) {
      console.error(`CPF ${this.cpf.trim()} falhou na validação.`);
      this.mensagemErro = 'O CPF informado não é válido. Por favor, verifique.';
      this.notasVisiveis = false;
      return;
    }

    // 3) Consultar os dados na API
    this.mensagemErro = '';
    this.notasVisiveis = false;

    this.registroService.consultar({
      cidade: this.cidade.trim(),
      estado: this.estado.trim(),
      nome: this.nome.trim(),
      cpf: this.cpf.trim(),
      idade: this.idade,
      matricula: this.matricula.trim()
    }).subscribe(
      (response: any[]) => {
        console.log('Resposta recebida do backend:', response);
        if (response && response.length > 0) {
          // Encontrar o registro do aluno pelo CPF
          const registro = response.find(item => item.cpf === this.cpf.trim());
          
          if (registro) {
            this.idAluno = registro.id;
            this.notas = {
              matematica: registro.matematica,
              estruturaDeDados: registro.estruturaDeDados,
              algoritmos: registro.algoritmos
            };
            this.notasVisiveis = true;
          } else {
            this.mensagemErro = 'Nenhum registro encontrado para o CPF fornecido.';
            this.notasVisiveis = false;
          }
        } else {
          this.mensagemErro = 'Nenhum registro encontrado.';
          this.notasVisiveis = false;
        }
      },
      (error: any) => {
        console.error('Erro ao consultar registros:', error);
        let errorMsg = 'Erro ao consultar dados. Tente novamente mais tarde.';
        if (error.status) {
          errorMsg += ` Código de status: ${error.status}.`;
        }
        if (error.error) {
          errorMsg += ` Detalhes do erro: ${JSON.stringify(error.error)}.`;
        }
        this.mensagemErro = errorMsg;
        this.notasVisiveis = false;
      }
    );
  }

  validarCPF(cpf: string): boolean {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }
}
