import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PerfilService } from 'src/app/servicos/perfil.service';
import { CandidatoService } from 'src/app/servicos/candidato.service';
import { Candidato } from 'src/app/models/candidato';
@Component({
  selector: 'app-candidato-create',
  templateUrl: './candidato-create.component.html',
  styleUrls: ['./candidato-create.component.css'],
})

export class CandidatoCreateComponent implements OnInit {

  candidato: Candidato = new Candidato();
  submitted = false;
  registerForm: FormGroup;
  perfis: any;
  nomeArquivo: any;

  constructor(private candidatoService: CandidatoService,
              private perfilService: PerfilService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      pretensao: [0, [Validators.required]],
      descricao: ['', [Validators.required]]
    });

    this.perfilService.getAll().subscribe(value => {
      this.perfis = value;
    },
    error => {
      if (error.status === 0) {
        this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
        return;
      }
    });

    this.novoCandidato();
  }

  get f() { return this.registerForm.controls; }

  novoCandidato(): void {
    this.submitted = false;
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

  salvar() {
    this.candidatoService.createCandidato(this.candidato)
      .subscribe(data => {this.snackbarService.show('Candidato cadastrado com sucesso.');
                          this.router.navigate(['Candidatos']);
                },
                 error => {
                   if (error.status === 0) {
                    this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
                    return;
                   }
                   this.snackbarService.show(error.error.message, 'erro');
                });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.snackbarService.show('Verifique os campos em vermelho.', 'aviso');
      return;
    }

    this.salvar();
  }
}
