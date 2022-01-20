import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PerfilService } from 'src/app/servicos/perfil.service';
import { Perfil } from 'src/app/models/perfil';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})           
export class PerfilEditComponent implements OnInit {

  id: any;
  perfil: Perfil = new Perfil();
  submitted = false;
  registerForm: FormGroup;

  constructor(private routeAtivo: ActivatedRoute,
              private router: Router,
              private perfilService: PerfilService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]]
    });

    this.id = this.routeAtivo.snapshot.paramMap.get('id');
    this.perfilService.getPerfil(this.id)
      .subscribe(data => {
          this.perfil = data;
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

  salvar() {
    this.perfilService.editPerfil(this.perfil)
      .subscribe(
        data => {
          this.snackbarService.show('Perfil alterado com sucesso');
          this.router.navigate(['Perfis']);
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
