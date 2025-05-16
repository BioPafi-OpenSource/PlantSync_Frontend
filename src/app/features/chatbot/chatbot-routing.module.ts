import { Routes } from '@angular/router';

export const chatbotRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/chatbot-view/chatbot-view.component').then(m => m.ChatbotViewComponent)
    }
];
