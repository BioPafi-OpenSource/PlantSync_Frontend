import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from './shared/components/sidebar-layout/sidebar-layout.component';
import { plantsRoutes } from './features/plants/plants-routing.module';

export const routes: Routes = [
    {
        path: '',
        component: SidebarLayoutComponent,
        children: [
            { path: '', redirectTo: 'plants', pathMatch: 'full' },
            {
                path: 'plants',
                children: plantsRoutes
            }
        ]
    }
];
