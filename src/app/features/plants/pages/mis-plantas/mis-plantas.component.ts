import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';

import {User} from "../../../auth/model/user.entity";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

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
    const currentUserJson = localStorage.getItem('currentUser');
    if (!currentUserJson) return;

    const currentUser: User = JSON.parse(currentUserJson);

    this.plantService.getPlantsByUserId(currentUser.id).subscribe((plants) => {
      this.plants = plants;
    });
  }
}
