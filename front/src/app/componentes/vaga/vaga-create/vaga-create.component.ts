import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { VagaService } from 'src/app/servicos/vaga.service';
import { Vaga } from 'src/app/models/vaga';
import { TipoVagaEnum } from 'src/app/models/tipoVagaEnum';
@Component({
  selector: 'app-vaga-create',
  templateUrl: './vaga-create.component.html',
  styleUrls: ['./vaga-create.component.css'],
})

export class VagaCreateComponent implements OnInit {

  vaga: Vaga = new Vaga();
  submitted = false;
  registerForm: FormGroup;
  tipoVagaEnum = TipoVagaEnum;

  constructor(private vagaService: VagaService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      salario: [0, [Validators.required]]
    });

    this.novoVaga();
  }

  get f() { return this.registerForm.controls; }

  novoVaga(): void {
    this.submitted = false;
  }

  salvar() {
    this.vagaService.createVaga(this.vaga)
      .subscribe(data => {this.snackbarService.show('Vaga cadastrada com sucesso.');
                          this.router.navigate(['Vagas']);
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
