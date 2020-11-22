import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }
  ConfirmDelete() {
    this.dialogref.close(true)
  }
  Close() {
    this.dialogref.close()
  }
}
