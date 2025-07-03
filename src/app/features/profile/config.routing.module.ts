import { Routes } from '@angular/router';


export const configRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/configuration-page/configuration-page.component').then(m => m.ConfigurationPageComponent)
    }
];
