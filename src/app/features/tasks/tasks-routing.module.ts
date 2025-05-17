// Defines the routing configuration for tasks feature.
// The default path ('') lazily loads the TaskViewComponent from the specified module.

import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/tasks-view/tasks-view.component').then(m => m.TaskViewComponent)
    }
];