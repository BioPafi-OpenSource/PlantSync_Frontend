import {Component, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-chatbot-message',
  imports: [
    MatCard
  ],
  templateUrl: './chatbot-message.component.html',
  styleUrl: './chatbot-message.component.css'
})
export class ChatbotMessage {
  @Input() text: string = '';
  @Input()sender: 'user' | 'bot' = 'bot';
}
