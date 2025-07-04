import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { ChatDisplayComponent } from '../../components/chat-display/chat-display.component';

@Component({
  selector: 'app-chatbot-page',
  standalone: true,
  imports: [CommonModule, ChatInputComponent, ChatDisplayComponent],
  templateUrl: './chatbot-page.component.html',
  styleUrls: ['./chatbot-page.component.css']
})
export class ChatbotPageComponent {
  messages: { role: 'user' | 'assistant', content: string }[] = [];

  handleUserMessage(userMessage: string) {
    this.messages.push({ role: 'user', content: userMessage });
  }

  handleAiResponse(aiReply: string) {
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.content === 'Pensando...') {
      lastMessage.content = aiReply;
    } else {
      this.messages.push({ role: 'assistant', content: aiReply });
    }
  }
}
