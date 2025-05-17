import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { User } from "../../../../shared/models/user";

@Component({
  selector: 'app-plant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {
  // Reactive form group for the plant form
  plantForm!: FormGroup;

  // Flag to check if the form is in edit mode
  isEditMode = false;

  // ID of the plant being edited
  plantId!: number;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private plantService: PlantService
  ) {}

  ngOnInit(): void {
    // Initialize the form with controls and validators
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
      humidity: ['Normal'],
      nextWateringDate: [''],
      imageUrl: [''],
      notificationsEnabled: [false]
    });

    // Check if an 'id' parameter exists in the route to determine edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.plantId = +id;

      // Load existing plant data and patch it into the form
      this.plantService.getPlantById(this.plantId).subscribe(plant => {
        this.plantForm.patchValue(plant);
      });
    }
  }

  onSubmit(): void {
    // Retrieve the form data
    const formData = this.plantForm.value;

    if (this.isEditMode) {
      // If editing, update the existing plant
      this.plantService.updatePlant(this.plantId, formData).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    } else {
      // If adding, get the current user from local storage
      const currentUserJson = localStorage.getItem('currentUser');
      if (!currentUserJson) return;

      const currentUser: User = JSON.parse(currentUserJson);

      // Create a new plant object including the user ID and a generated next watering date
      const newPlant: Plant = {
        ...formData,
        userId: currentUser.id,
        nextWateringDate: this.generateNextWateringDate()
      };

      // Remove 'id' property if present (to avoid conflicts when adding)
      delete (newPlant as any).id;

      // Add the new plant via the service
      this.plantService.addPlant(newPlant).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    }
  }

  // Helper method to generate a next watering date 5 days from today
  generateNextWateringDate(): string {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    return today.toISOString().split('T')[0];  // Return date as YYYY-MM-DD string
  }
}
