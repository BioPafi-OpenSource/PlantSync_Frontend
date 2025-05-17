import { Routes } from '@angular/router';

// Defines routes related to the chatbot feature
export const chatbotRoutes: Routes = [
    {
        path: '',  // Default route for this module (empty path)
        loadComponent: () =>
            // Lazy loads the ChatbotViewComponent when this route is accessed
            import('./pages/chatbot-view/chatbot-view.component').then(m => m.ChatbotViewComponent)
    }
];