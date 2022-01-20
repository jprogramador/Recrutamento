import { Component, OnInit, ViewChild } from '@angular/core';
import { VagaService } from 'src/app/servicos/vaga.service';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ConfirmacaoDialogComponent } from 'src/app/shared/confirmacao-dialog/confirmacao-dialog.component';
import { CandidatoService } from 'src/app/servicos/candidato.service';

@Component({
  selector: 'app-vaga-list',
  templateUrl: './vaga-list.component.html',
  styleUrls: ['./vaga-list.component.css']
})

export class VagaListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'tipo', 'salario', 'acoes'];
  displayedColumns2: string[] = ['nome', 'perfil', 'pretensao', 'curriculoNome', 'acoes'];
  dataSource = new MatTableDataSource([]);
  dataSource2 = new MatTableDataSource([]);
  exibirCandidatos = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private vagaService: VagaService,
              private candidatoService: CandidatoService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.recarregar();
  }

  recarregar() {

    this.vagaService.getAll().subscribe(value => {
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

  candidatos(descricao) {
    this.candidatoService.getCandidatoByDescricao(descricao).subscribe(value => {
      this.exibirCandidatos = value.length>0;
      this.dataSource2 = new MatTableDataSource(value);

      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
    },
    error => {
      if (error.status === 0) {
        this.snackbarService.show('Falha na comunicação com o servidor.', 'erro');
        return;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
        this.vagaService.deleteVaga(id)
          .subscribe(data => {this.snackbarService.show('Vaga excluída com sucesso.');
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
}
