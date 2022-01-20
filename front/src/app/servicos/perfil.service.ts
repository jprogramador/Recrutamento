import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private baseUrl = environment.apiEndPoint + '/perfis';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPerfil(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/' + id);
  }

  createPerfil(perfil: Object): Observable<Object> {
    return this.http.post(this.baseUrl, perfil);
  }

  deletePerfil(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  editPerfil(perfil: Object): Observable<Object> {
    return this.http.put(this.baseUrl, perfil);
  }
}
