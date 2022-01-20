import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PerfilService } from 'src/app/servicos/perfil.service';
import { Perfil } from 'src/app/models/perfil';
@Component({
  selector: 'app-perfil-create',
  templateUrl: './perfil-create.component.html',
  styleUrls: ['./perfil-create.component.css'],
})

export class PerfilCreateComponent implements OnInit {

  perfil: Perfil = new Perfil();
  submitted = false;
  registerForm: FormGroup;

  constructor(private perfilService: PerfilService,
              private router: Router,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]]
    });

    this.novoPerfil();
  }

  get f() { return this.registerForm.controls; }

  novoPerfil(): void {
    this.submitted = false;
  }

  salvar() {
    this.perfilService.createPerfil(this.perfil)
      .subscribe(data => {this.snackbarService.show('Perfil cadastrado com sucesso.');
                          this.router.navigate(['Perfis']);
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
