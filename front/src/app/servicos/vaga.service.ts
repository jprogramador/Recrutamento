import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private baseUrl = environment.apiEndPoint + '/vagas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getVaga(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createVaga(vaga: Object): Observable<Object> {
    return this.http.post(this.baseUrl, vaga);
  }

  deleteVaga(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  editVaga(vaga: Object): Observable<Object> {
    return this.http.put(this.baseUrl, vaga);
  }
}
