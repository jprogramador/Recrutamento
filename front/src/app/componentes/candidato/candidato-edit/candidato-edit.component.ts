import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PerfilService } from 'src/app/servicos/perfil.service';
import { Perfil } from 'src/app/models/perfil';
import { CandidatoService } from 'src/app/servicos/candidato.service';
import { Candidato } from 'src/app/models/candidato';

@Component({
  selector: 'app-candidato-edit',
  templateUrl: './candidato-edit.component.html',
  styleUrls: ['./candidato-edit.component.css']
})           
export class CandidatoEditComponent implements OnInit {

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

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.snackbarService.show('Verifique os campos em vermelho.', 'aviso');
      return;
    }

    this.salvar();
  }

  curriculoChange(event): void {
    var that = this
    const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        reader.onload = function () {
          that.candidato.curriculoBase64 = reader.result.toString();
          that.candidato.curriculoNome = file.name;
          that.nomeArquivo = file.name;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  salvar() {
    this.candidatoService.editCandidato(this.candidato)
      .subscribe(
        data => {
          this.snackbarService.show('Candidato alterado com sucesso');
          this.router.navigate(['Candidatos']);
        },
        error => {
          if (error.status === 0) {
            this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
            return;
          }
          this.snackbarService.show(error.error.message, 'erro');
        }
      );
  }
}
