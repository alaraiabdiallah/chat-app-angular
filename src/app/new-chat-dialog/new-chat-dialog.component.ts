import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.scss']
})
export class NewChatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
