import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../models/guide.model';

@Component({
    selector: 'app-guide-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './guide-detail.component.html',
    styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {
    // Property to hold the guide data
    guide!: Guide;

    // Property to hold the ID of the guide from the route
    guideId!: number;

    constructor(
        private route: ActivatedRoute,   // Service to access route parameters
        private router: Router,          // Service for navigation (not used here yet)
        private guideService: GuidesService  // Service to fetch guide data
    ) {}

    // Lifecycle hook that runs after component initialization
    ngOnInit(): void {
        // Retrieve the 'id' parameter from the route and convert it to a number
        this.guideId = Number(this.route.snapshot.paramMap.get('id'));

        // Load the guide data based on the retrieved ID
        this.loadGuide();
    }

    // Method to call the service and fetch guide details by ID
    loadGuide(): void {
        this.guideService.getGuideById(this.guideId)
            .subscribe(data => this.guide = data);
    }
}

