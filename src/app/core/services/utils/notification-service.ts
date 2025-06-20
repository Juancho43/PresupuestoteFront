import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private snackBar = inject(MatSnackBar);

  showNotification(message: string, action: string = 'Cerrar', duration: number = 3000, panelClass?: string[]) {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: panelClass
    });
  }

  showSuccessNotification(message: string = '¡Operación exitosa!', action: string = 'Cerrar', duration: number = 3000) {
    this.showNotification(message, action, duration, ['success-snackbar']);
  }

  showErrorNotification(message: string = '¡Hubo un error!', action: string = 'Cerrar', duration: number = 3000) {
    this.showNotification(message, action, duration, ['error-snackbar']);
  }
}
