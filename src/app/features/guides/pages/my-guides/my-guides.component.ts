import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../models/guide.model';

@Component({
  selector: 'app-mis-guias',  // Component selector used in templates
  standalone: true,           // Indicates this is a standalone component
  imports: [CommonModule, RouterModule], // Modules imported for use in the component
  templateUrl: './my-guides.component.html',  // External HTML template for the component
  styleUrls: ['./my-guides.component.css']    // External CSS styles for the component
})
export class MyGuidesComponent implements OnInit {
  guides: Guide[] = []; // Array to store the list of guides

  constructor(private guideService: GuidesService) {} // Injecting GuidesService for data access

  ngOnInit(): void {
    // On component initialization, fetch guides data from the service
    this.guideService.getGuides().subscribe(data => this.guides = data);
  }
}
