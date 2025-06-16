import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent
{
  constructor(
  public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA)
  public data: {mensaje: string}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
