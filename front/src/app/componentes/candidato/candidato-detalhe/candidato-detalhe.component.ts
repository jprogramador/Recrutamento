import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PerfilService } from 'src/app/servicos/perfil.service';
import { Perfil } from 'src/app/models/perfil';
import { CandidatoService } from 'src/app/servicos/candidato.service';
import { Candidato } from 'src/app/models/candidato';

@Component({
  selector: 'app-candidato-detalhe',
  templateUrl: './candidato-detalhe.component.html',
  styleUrls: ['./candidato-detalhe.component.css']
})           
export class CandidatoDetalheComponent implements OnInit {

  id: any;
  candidato: Candidato = new Candidato();
  perfis: any;
  submitted = false;
  registerForm: FormGroup;
  nomeArquivo: any;

  constructor(private routeAtivo: ActivatedRoute,
              private router: Router,
              private candidatoService: CandidatoService,
              private perfilService: PerfilService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      pretensao: [0, [Validators.required]],
      descricao: ['', [Validators.required]]
    });

    this.id = this.routeAtivo.snapshot.paramMap.get('id');
    this.candidatoService.getCandidato(this.id)
      .subscribe(data => {
          this.candidato = data;
          this.nomeArquivo = this.candidato.curriculoNome;

          this.perfilService.getAll().subscribe(value => {
            this.perfis = value;
          },
          error => {
            if (error.status === 0) {
              this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
              return;
            }
          });

        },
        error => {
          if (error.status === 0) {
           this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
           this.router.navigate(['Perfis']);
           return;
          }

          this.snackbarService.show(error.error.message, 'erro');
          this.router.navigate(['Perfis']);
       });
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}
