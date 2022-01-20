import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  private baseUrl = environment.apiEndPoint + '/candidatos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getCandidato(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  getCandidatoByDescricao(descricao: string): Observable<any> {
    return this.http.get(this.baseUrl + 'Descricao/' + descricao);
  }

  createCandidato(candidato: Object): Observable<Object> {
    return this.http.post(this.baseUrl, candidato);
  }

  deleteCandidato(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  editCandidato(candidato: Object): Observable<Object> {
    return this.http.put(this.baseUrl, candidato);
  }
}
