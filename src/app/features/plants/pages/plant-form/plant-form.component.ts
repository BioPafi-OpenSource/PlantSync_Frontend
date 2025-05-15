import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import {User} from "../../../../shared/models/user";

@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {
  plantForm!: FormGroup;
  isEditMode = false;
  plantId!: number;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
      humidity: ['Normal'],
      nextWateringDate: [''],
      imageUrl: [''],
      notificationsEnabled: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.plantId = +id;
      this.plantService.getPlantById(this.plantId).subscribe(plant => {
        this.plantForm.patchValue(plant);
      });
    }
  }

  onSubmit(): void {
    const formData = this.plantForm.value;

    if (this.isEditMode) {
      this.plantService.updatePlant(this.plantId, formData).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    } else {
      const currentUserJson = localStorage.getItem('currentUser');
      if (!currentUserJson) return;

      const currentUser: User = JSON.parse(currentUserJson);

      const newPlant: Plant = {
        ...formData,
        userId: currentUser.id,
        nextWateringDate: this.generateNextWateringDate()
      };

      delete (newPlant as any).id;

      this.plantService.addPlant(newPlant).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    }
  }

  generateNextWateringDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    return today.toISOString().split('T')[0];
  }
}
