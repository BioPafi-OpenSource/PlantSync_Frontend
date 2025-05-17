import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from './shared/components/sidebar-layout/sidebar-layout.component';
import { plantsRoutes } from './features/plants/plants-routing.module';

import { tasksRoutes } from "./features/tasks/tasks-routing.module";
import { chatbotRoutes } from "./features/chatbot/chatbot-routing.module";

import { guidesRoutes } from './features/guides/guides-routing.module';
import { authGuard } from "./core/guards/auth.guard";

// Main application routes configuration
export const routes: Routes = [
    {
        // Default route redirects to the login page
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        // Route to load the login component lazily
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        // Route to load the registration component lazily
        path: 'register',
        loadComponent: () =>
            import('./features/auth/pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        // Routes protected by authentication guard using SidebarLayoutComponent as layout
        path: '',
        component: SidebarLayoutComponent,
        canActivate: [authGuard],
        children: [
            // Default child route redirects to 'plants' page
            { path: '', redirectTo: 'plants', pathMatch: 'full' },

            // Routes related to plants feature
            {
                path: 'plants',
                children: plantsRoutes
            },

            // Routes related to tasks feature
            {
                path: 'tasks',
                children: tasksRoutes
            },

            // Routes related to chatbot feature
            {
                path: 'chatbot',
                children: chatbotRoutes
            },

            // Routes related to guides feature
            {
                path: 'guides',
                children: guidesRoutes
            }
        ]
    }
];

