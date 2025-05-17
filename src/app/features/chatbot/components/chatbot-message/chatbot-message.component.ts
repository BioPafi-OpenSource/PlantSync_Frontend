import {Component, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-chatbot-message',  // Component selector to use in templates
  imports: [
    MatCard  // Importing Angular Material Card module for UI styling
  ],
  templateUrl: './chatbot-message.component.html',  // HTML template file
  styleUrl: './chatbot-message.component.css'       // CSS styles file
})
export class ChatbotMessage {
  @Input() text: string = '';  // Input property for the message text
  @Input() sender: 'user' | 'bot' = 'bot';  // Input property to indicate if the message is from user or bot
}

