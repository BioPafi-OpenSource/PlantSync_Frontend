import { Routes } from '@angular/router';

// Define the routes for the "plants" feature module
export const plantsRoutes: Routes = [
  {
    // Default route: displays the list of user's plants
    path: '',
    loadComponent: () =>
        import('./pages/mis-plantas/mis-plantas.component').then(m => m.MisPlantasComponent)
  },
  {
    // Route to add a new plant
    path: 'add',
    loadComponent: () =>
        import('./pages/plant-form/plant-form.component').then(m => m.PlantFormComponent)
  },
  {
    // Route to view the details of a specific plant by ID
    path: ':id',
    loadComponent: () =>
        import('./pages/plant-detail/plant-detail.component').then(m => m.PlantDetailComponent)
  },
  {
    // Route to edit an existing plant by ID
    path: ':id/edit',
    loadComponent: () =>
        import('./pages/plant-form/plant-form.component').then(m => m.PlantFormComponent)
  },
  {
    // Route to view the historical data of a specific plant by ID
    path: ':id/history',
    loadComponent: () =>
        import('./pages/plant-history-view/plant-history-view.component').then(m => m.PlantHistoryViewComponent)
  }
];
