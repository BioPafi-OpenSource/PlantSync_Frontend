import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Plant} from "../../../plants/model/plant";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {PlantService} from "../../../plants/services/plant.service";
import {TaskService} from "../../services/task.service";
import {Component, OnInit} from "@angular/core";
import {Task} from "../../model/task.entity";

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent implements OnInit {
  form!: FormGroup;
  plants: Plant[] = [];
  currentUserId!: number;

  constructor(
      private fb: FormBuilder,
      private plantService: PlantService,
      private taskService: TaskService,
      private dialogRef: MatDialogRef<AddTaskDialogComponent>
  ) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return;

    this.currentUserId = JSON.parse(userJson).id;

    this.form = this.fb.group({
      plantId: ['', Validators.required],
      action: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.plantService.getPlantsByUserId(this.currentUserId).subscribe(plants => {
      this.plants = plants;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const rawDate: Date = this.form.value.date;
    const formattedDate = rawDate.toISOString().split('T')[0];

    const task: Task = {
      id: 0,
      completed: false,
      userId: this.currentUserId,
      ...this.form.value,
      date: formattedDate,
    };

    this.taskService.create(task).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
