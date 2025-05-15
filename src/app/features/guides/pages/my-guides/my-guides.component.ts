import { Component, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../models/guide.model';

@Component({
  selector: 'app-mis-guias',
  standalone: true,
    imports: [CommonModule, RouterModule],
  templateUrl: './my-guides.component.html',
  styleUrls: ['./my-guides.component.css']
})
export class MyGuidesComponent implements OnInit {
  guides: Guide[] = [];

  constructor(private guideService: GuidesService) {}

  ngOnInit(): void {
    this.guideService.getGuides().subscribe(data => this.guides = data);
  }
}
