import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';

@Component({
  selector: 'app-mis-plantas',
  standalone: true,
    imports: [CommonModule, RouterModule],
  templateUrl: './mis-plantas.component.html',
  styleUrls: ['./mis-plantas.component.css']
})
export class MisPlantasComponent implements OnInit {
  plants: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getPlants().subscribe(data => this.plants = data);
  }
}
