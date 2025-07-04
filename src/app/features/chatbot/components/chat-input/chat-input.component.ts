import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent {
  userInput: string = '';
  loading: boolean = false;

  @Output() sendUserMessage = new EventEmitter<string>();
  @Output() updateAiResponse = new EventEmitter<string>();

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const question = this.userInput;
    this.loading = true;

    // Emitimos solo el mensaje del usuario una vez
    this.sendUserMessage.emit(question);

    // Mostramos placeholder "Pensando..." mientras responde
    this.updateAiResponse.emit('Pensando...');

    this.aiService.askQuestion(question).subscribe({
      next: (response) => {
        const aiReply = response.choices[0].message.content;
        this.updateAiResponse.emit(aiReply);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al consultar IA:', err);
        this.updateAiResponse.emit('No se pudo obtener respuesta (error 429).');
        this.loading = false;
      }
    });

    this.userInput = '';
  }
}
