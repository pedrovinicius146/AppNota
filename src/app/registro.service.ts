// registro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://127.0.0.1:8000/api/registros/';

  constructor(private http: HttpClient) {}

  registrar(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  consultar(dados: any): Observable<any> {
    
    const consultaUrl = `${this.apiUrl}?cidade=${dados.cidade}&estado=${dados.estado}&nome=${dados.nome}&cpf=${dados.cpf}&idade=${dados.idade}&matricula=${dados.matricula}`;

    return this.http.get(consultaUrl);
  }
}