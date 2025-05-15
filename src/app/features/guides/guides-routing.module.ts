import { Routes } from '@angular/router';

//CONFIGURACION DE RUTAS DE LAS GUIAS
export const guidesRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/my-guides/my-guides.component').then(m => m.MyGuidesComponent)
    },
    {
        path: ':id',
        loadComponent: () =>
            import('./pages/guides-detail/guide-detail.component').then(m => m.GuideDetailComponent)
    },

];
