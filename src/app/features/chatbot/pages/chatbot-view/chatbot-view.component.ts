import { Component, OnInit } from '@angular/core';
import { ChatbotComponent } from "../../components/chatbot/chatbot.component";

@Component({
  selector: 'app-chatbot-view',  // Selector for the chatbot view component
  standalone: true,              // Declares this as a standalone component
  imports: [
    ChatbotComponent             // Imports the ChatbotComponent to use within this component
  ],
  templateUrl: './chatbot-view.component.html', // External HTML template for this component
  styleUrl: './chatbot-view.component.css'      // External CSS stylesheet for styling
})
export class ChatbotViewComponent {
  // This component currently has no additional logic or properties
}
