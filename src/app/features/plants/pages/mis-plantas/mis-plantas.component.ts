import { Component, OnInit } from '@angular/core';
import { Plant } from '../../models/plant';
import { PlantService } from '../../services/plant.service';
import {User} from "../../../../shared/models/user";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-mis-plantas',
  templateUrl: './mis-plantas.component.html',
  imports: [
    RouterLink,
    NgForOf
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
