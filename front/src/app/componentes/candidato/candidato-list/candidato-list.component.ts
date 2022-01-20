import { Component, OnInit, ViewChild } from '@angular/core';
import { CandidatoService } from 'src/app/servicos/candidato.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ConfirmacaoDialogComponent } from 'src/app/shared/confirmacao-dialog/confirmacao-dialog.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-candidato-list',
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.css']
})

export class CandidatoListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'perfil', 'pretensao', 'curriculoNome','acoes'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private candidatoService: CandidatoService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.recarregar();
  }

  recarregar() {

    this.candidatoService.getAll().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);

      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase(); return dataStr.indexOf(filter) !== -1;
      };
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'perfil.nome': return item.perfil.nome;
          default: return item[property];
        }
      };

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

  baixar(base64, nome){
    console.log(base64)
    var base64String = base64.substring(base64.indexOf("base64,")+7)
    var binStr = atob(base64String);
    var len = binStr.length;
    var arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      arr[ i ] = binStr.charCodeAt( i );
    }

    var blob = new Blob( [ arr ], { type: base64.substring(5, base64.indexOf("base64,")-1) } )
    var url = URL.createObjectURL( blob );
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = nome;
    a.click();
    window.URL.revokeObjectURL(url);
    //var pdfWindow = window.open("");
    //pdfWindow.document.write("<iframe width='100%' height='99%' src='" + url + "'></iframe>");
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
        this.candidatoService.deleteCandidato(id)
          .subscribe(data => {this.snackbarService.show('Candidato excluído com sucesso.');
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
