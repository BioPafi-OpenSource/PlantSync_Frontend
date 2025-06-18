import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GuidesService } from '../../services/guides.service';
import { Guide } from '../../model/guide.model';

@Component({
    selector: 'app-guide-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './guide-detail.component.html',
    styleUrls: ['./guide-detail.component.css']
})
export class GuideDetailComponent implements OnInit {
    guide!: Guide;
    guideId!: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private guideService: GuidesService
    ) {}

    ngOnInit(): void {
        this.guideId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadGuide();
    }

    loadGuide(): void {
        this.guideService.getGuideById(this.guideId).subscribe(data => this.guide = data);
    }


}
