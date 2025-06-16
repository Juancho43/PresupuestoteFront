import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '@shared/confirmation-dialog/confirmation-dialog.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private dialog = inject(MatDialog);
  private router = inject(Router);
 openDialog(mensaje: string) {
   return this.dialog.open(ConfirmationDialogComponent, {
      data: {mensaje: mensaje},
     }
     )
   }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
