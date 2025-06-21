import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../model/plant';


import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Profile} from "../../../profile/model/profile.entity";

@Component({
  selector: 'app-mis-plantas',
  standalone: true,
  templateUrl: './mis-plantas.component.html',
  imports: [
    RouterLink,
    NgForOf,
    CommonModule, RouterModule
  ],
  styleUrls: ['./mis-plantas.component.css']
})
export class MisPlantasComponent implements OnInit {
  plants: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    const currentProfileJson = localStorage.getItem('currentProfile');
    if (!currentProfileJson) return;

    const currentProfile: Profile = JSON.parse(currentProfileJson);

    this.plantService.getPlantsByProfileId(currentProfile.id).subscribe((plants) => {
      this.plants = plants;
    });
  }
}
