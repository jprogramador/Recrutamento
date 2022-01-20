import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
})

export class SnackbarComponent implements OnInit, OnDestroy {

  show = false;
  message = 'This is snackbar';
  type = 'sucesso';
  private snackbarSubscription: Subscription;

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.snackbarSubscription = this.snackbarService.snackbarState
    .subscribe(
      (state) => {
        if (state.type) {
          this.type = state.type;
        } else {
          this.type = 'sucesso';
        }
        this.message = state.message;
        this.show = state.show;
        setTimeout(() => {
          this.show = false;
        }, 3000);
      });
  }

  ngOnDestroy() {
    this.snackbarSubscription.unsubscribe();
  }
}
