import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';
import {WeatherCardComponent} from "../../../weather/components/weather-card/weather-card.component";

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherCardComponent],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  plant!: Plant;
  plantId!: number;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private plantService: PlantService
  ) {}

  ngOnInit(): void {
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlant();
  }

  loadPlant(): void {
    this.plantService.getPlantById(this.plantId).subscribe(data => this.plant = data);
  }

  onDelete(): void {
    if (confirm('¿Estás seguro de eliminar esta planta?')) {
      this.plantService.deletePlant(this.plantId).subscribe({
        next: () => {
          this.router.navigate(['/plants']);
        },
        error: (err) => {
          console.error('Error al eliminar la planta:', err);
          alert('Hubo un problema al eliminar la planta.');
        }
      });

    }
  }
}
