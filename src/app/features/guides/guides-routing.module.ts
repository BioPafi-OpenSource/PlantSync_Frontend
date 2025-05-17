import { Routes } from '@angular/router';

// ROUTE CONFIGURATION FOR THE GUIDES SECTION
export const guidesRoutes: Routes = [
    {
        path: '',  // Default route loads the component that shows the list of guides
        loadComponent: () =>
            import('./pages/my-guides/my-guides.component').then(m => m.MyGuidesComponent)
    },
    {
        path: ':id',  // Dynamic route for showing the details of a specific guide by its ID
        loadComponent: () =>
            import('./pages/guides-detail/guide-detail.component').then(m => m.GuideDetailComponent)
    },
];

