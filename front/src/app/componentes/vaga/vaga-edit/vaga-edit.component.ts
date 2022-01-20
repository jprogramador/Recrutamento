import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { VagaService } from 'src/app/servicos/vaga.service';
import { Vaga } from 'src/app/models/vaga';
import { TipoVagaEnum } from 'src/app/models/tipoVagaEnum';

@Component({
  selector: 'app-vaga-edit',
  templateUrl: './vaga-edit.component.html',
  styleUrls: ['./vaga-edit.component.css']
})           
export class VagaEditComponent implements OnInit {

  id: any;
  vaga: Vaga = new Vaga();
  submitted = false;
  registerForm: FormGroup;
  tipoVagaEnum = TipoVagaEnum;

  constructor(private routeAtivo: ActivatedRoute,
              private router: Router,
              private vagaService: VagaService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) { }

  compareObjects(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      salario: [0, [Validators.required]]
    });

    this.id = this.routeAtivo.snapshot.paramMap.get('id');
    this.vagaService.getVaga(this.id)
      .subscribe(data => {
          this.vaga = data;
        },
        error => {
          if (error.status === 0) {
           this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
           this.router.navigate(['Vagas']);
           return;
          }

          this.snackbarService.show(error.error.message, 'erro');
          this.router.navigate(['Vagas']);
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

  salvar() {
    this.vagaService.editVaga(this.vaga)
      .subscribe(
        data => {
          this.snackbarService.show('Vaga alterada com sucesso');
          this.router.navigate(['Vagas']);
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
