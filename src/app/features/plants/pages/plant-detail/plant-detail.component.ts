import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { WeatherCardComponent } from '../../../weather/components/weather-card/weather-card.component';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  // Import necessary modules and components, including the weather card component
  imports: [CommonModule, RouterModule, WeatherCardComponent],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  plant!: Plant;  // Holds the plant details to be displayed
  plantId!: number; // Stores the ID of the plant being viewed

  constructor(
      private route: ActivatedRoute, // To access route parameters
      private router: Router,        // For navigation
      private plantService: PlantService // Service to fetch plant data
  ) {}

  ngOnInit(): void {
    // Retrieve the plant ID from the route parameters and load the plant data
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlant();
  }

  loadPlant(): void {
    // Call the service to fetch plant data by ID and assign it to the component property
    this.plantService.getPlantById(this.plantId).subscribe(data => this.plant = data);
  }

  onDelete(): void {
    // Confirm deletion with the user
    if (confirm('Are you sure you want to delete this plant?')) {
      // If confirmed, call the service to delete the plant and navigate back to the plants list
      this.plantService.deletePlant(this.plantId).subscribe(() => {
        this.router.navigate(['/plants']);
      });
    }
  }
}

