import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfilService } from 'src/app/servicos/perfil.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ConfirmacaoDialogComponent } from 'src/app/shared/confirmacao-dialog/confirmacao-dialog.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})

export class PerfilListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'acoes'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private perfilService: PerfilService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.recarregar();
  }

  recarregar() {

    this.perfilService.getAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error => {
      if (error.status === 0) {
        this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
        return;
      }
    });
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      data: {
        message: 'Tem certeza que deseja excluir?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.perfilService.deletePerfil(id)
          .subscribe(data => {this.snackbarService.show('Perfil excluído com sucesso.');
                              this.recarregar();
                    },
                    error => {
                      if (error.status === 0) {
                        this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
                        return;
                      }
                      this.snackbarService.show(error.error.message, 'erro');
                    });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
