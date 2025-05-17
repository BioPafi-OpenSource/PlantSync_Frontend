import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { User } from '../../../../shared/models/user';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-mis-plantas',
  standalone: true,
  templateUrl: './mis-plantas.component.html',
  imports: [
    RouterLink,   // Import RouterLink directive for navigation links
    NgForOf,      // Import NgForOf directive for iterating over lists
    CommonModule, // Import common Angular directives and pipes
    RouterModule  // Import router functionalities
  ],
  styleUrls: ['./mis-plantas.component.css']
})
export class MisPlantasComponent implements OnInit {
  plants: Plant[] = []; // Array to hold the plants of the current user

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    // Retrieve the current user data from localStorage
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return;  // Exit if no user data found

    // Parse the stored JSON string into a User object
    const currentUser: User = JSON.parse(currentUserJson);

    // Fetch plants associated with the current user by their user ID
    this.plantService.getPlantsByUserId(currentUser.id).subscribe((plants) => {
      this.plants = plants; // Assign the fetched plants to the component property
    });
  }
}

