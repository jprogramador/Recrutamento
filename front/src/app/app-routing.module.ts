import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './componentes/home/home.component';
// tslint:disable-next-line:max-line-length
import { PerfilListComponent } from './componentes/perfil/perfil-list/perfil-list.component';
import { PerfilCreateComponent } from './componentes/perfil/perfil-create/perfil-create.component';
import { PerfilEditComponent } from './componentes/perfil/perfil-edit/perfil-edit.component';
import { VagaListComponent } from './componentes/vaga/vaga-list/vaga-list.component';
import { VagaCreateComponent } from './componentes/vaga/vaga-create/vaga-create.component';
import { VagaEditComponent } from './componentes/vaga/vaga-edit/vaga-edit.component';
import { CandidatoListComponent } from './componentes/candidato/candidato-list/candidato-list.component';
import { CandidatoCreateComponent } from './componentes/candidato/candidato-create/candidato-create.component';
import { CandidatoEditComponent } from './componentes/candidato/candidato-edit/candidato-edit.component';
import { CandidatoDetalheComponent } from './componentes/candidato/candidato-detalhe/candidato-detalhe.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'Perfis', component: PerfilListComponent },
      { path: 'NovoPerfil', component: PerfilCreateComponent },
      { path: 'EditarPerfil/:id', component: PerfilEditComponent },
      { path: 'Vagas', component: VagaListComponent },
      { path: 'EditarVaga/:id', component: VagaEditComponent },
      { path: 'NovoVaga', component: VagaCreateComponent },
      { path: 'Candidatos', component: CandidatoListComponent },
      { path: 'EditarCandidato/:id', component: CandidatoEditComponent },
      { path: 'DetalheCandidato/:id', component: CandidatoDetalheComponent },
      { path: 'NovoCandidato', component: CandidatoCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
