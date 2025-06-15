// Import core Angular functionality and required Material Dialog modules
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,           // Token to inject the data passed to the dialog
  MatDialogActions,          // Component for dialog action buttons
  MatDialogContent,          // Component for dialog content section
  MatDialogRef,              // Reference to the currently opened dialog
  MatDialogTitle             // Component for the dialog title section
} from '@angular/material/dialog';
import { MatButton } from "@angular/material/button"; // Material button module

// Component metadata
@Component({
  selector: 'app-task-confirmation-dialog', // Component selector
  templateUrl: './task-confirmation-dialog.component.html', // HTML template path
  imports: [
    MatDialogTitle,      // Import Material dialog title
    MatDialogContent,    // Import Material dialog content
    MatDialogActions,    // Import Material dialog actions
    MatButton            // Import Material buttons
  ],
  styleUrls: ['./task-confirmation-dialog.component.css'] // CSS styles
})
export class TaskConfirmationDialogComponent {

  // Constructor receives a reference to the dialog and the data injected
  constructor(
      public dialogRef: MatDialogRef<TaskConfirmationDialogComponent>, // Dialog reference
      @Inject(MAT_DIALOG_DATA) public data: any                         // Injected dialog data
  ) {}

  // Method called when the user clicks "Cancel" – closes the dialog and returns false
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Method called when the user confirms – closes the dialog and returns true
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}