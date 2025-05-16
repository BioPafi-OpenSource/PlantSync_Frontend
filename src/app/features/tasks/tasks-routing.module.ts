import { Routes } from '@angular/router';


export const tasksRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/tasks-view/tasks-view.component').then(m => m.TaskViewComponent)
    }
];
