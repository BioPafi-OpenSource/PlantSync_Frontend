import { Routes } from '@angular/router';
import { SidebarLayoutComponent } from './shared/components/sidebar-layout/sidebar-layout.component';
import { plantsRoutes } from './features/plants/plants-routing.module';
import {tasksRoutes} from "./features/tasks/tasks-routing.module";
import {chatbotRoutes} from "./features/chatbot/chatbot-routing.module";
export const routes: Routes = [
    {
        path: '',
        component: SidebarLayoutComponent,
        children: [
            { path: '', redirectTo: 'plants', pathMatch: 'full' },
            {
                path: 'plants',
                children: plantsRoutes
            },
            {
                path: 'tasks',
                children: tasksRoutes
            },
            { path: 'chatbot',
                children: chatbotRoutes }
        ]
    }
];
