import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatButtonModule,
  MatSortModule,
  MatTableModule,
  MatSnackBarModule,
  MatCardModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule} from '@angular/material';

import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { ConfirmacaoDialogComponent } from './shared/confirmacao-dialog/confirmacao-dialog.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPrintModule } from 'ngx-print';
import { LayoutComponent } from './layout/layout.component';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './componentes/home/home.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

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

export class DefaultIntl extends OwlDateTimeIntl {

  /** A label for the cancel button */
  cancelBtnLabel = 'Cancelar';

  /** A label for the set button */
  setBtnLabel = 'Confirmar';
}

@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent,
    ConfirmacaoDialogComponent,
    LayoutComponent,
    VagaListComponent,
    VagaEditComponent,
    VagaCreateComponent,
    HomeComponent,
    PerfilListComponent,
    PerfilCreateComponent,
    PerfilEditComponent,
    CandidatoListComponent,
    CandidatoCreateComponent,
    CandidatoEditComponent,
    CandidatoDetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgxPrintModule,
    MatSelectModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    MatGridListModule
  ],
  entryComponents: [
    ConfirmacaoDialogComponent,
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'br' },
    { provide: OwlDateTimeIntl, useClass: DefaultIntl },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
