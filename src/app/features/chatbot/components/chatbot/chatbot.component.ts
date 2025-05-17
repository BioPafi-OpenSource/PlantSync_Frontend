import { Component, OnInit } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { NgForOf, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { Plant } from "../../../plants/models/plant";
import { PlantService } from "../../../plants/services/plant.service";
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { ChatbotMessage} from "../chatbot-message/chatbot-message.component";

// Component decorator defines metadata for the ChatbotComponent
@Component({
  selector: 'app-chatbot', // Component selector used in HTML
  standalone: true, // Indicates this is a standalone component
  imports: [
    MatCard,        // Material Card module for layout
    NgForOf,        // Structural directive for *ngFor
    MatButton,      // Material Button component
    NgIf,           // Structural directive for *ngIf
    ChatbotMessage, // Custom ChatbotMessage component
    MatLabel,       // Material Label
    MatSelect,      // Material Select dropdown
    MatFormField,   // Material form field wrapper
    FormsModule,    // Enables ngModel binding
    MatOption,      // Material Select option
  ],
  templateUrl: './chatbot.component.html', // Template file
  styleUrl: './chatbot.component.css'      // CSS file
})
export class ChatbotComponent implements OnInit {
  // Initial welcome message from the bot
  initialMessage = '¡Hola! Soy tu asistente de plantas. ¿En qué te puedo ayudar?';

  // Array of messages exchanged in the chat
  messages: ChatbotMessage[] = [
    { text: this.initialMessage, sender: 'bot' }
  ];

  // Predefined questions user can ask
  botOptions = [
    '¿Cuándo es el siguiente riego?',
    '¿Qué tipo de planta es esta?',
    '¿Cuándo adquirí esta planta?',
    '¿Cuál es la humedad de mi planta?'
  ];

  // List of user's plants
  plants: Plant[] = [];

  // Currently selected plant's ID
  selectedPlantId: number | null = null;

  // UI control variables
  showPlantSelector = false;
  showResetButton = false;

  // Tracks the type of question asked
  currentQuestionType: 'watering' | 'species' | 'acquisition' | 'humidity' | undefined;

  // Injects the plant service to fetch plant data
  constructor(private plantService: PlantService) {}

  // Lifecycle hook - loads user's plants on component init
  ngOnInit() {
    this.loadPlants();
  }

  // Fetches the list of plants from the service
  loadPlants() {
    this.plantService.getPlants().subscribe({
      next: (plants) => {
        this.plants = plants;
      },
      error: (err) => {
        console.error('Error loading plants:', err);
        this.addBotMessage('No puedo cargar las plantas ahora. Por favor intenta más tarde.');
      }
    });
  }

  // Adds a message from the bot to the chat
  addBotMessage(text: string) {
    this.messages.push({
      text,
      sender: 'bot'
    });
  }

  // Adds a message from the user to the chat
  addUserMessage(text: string) {
    this.messages.push({
      text,
      sender: 'user'
    });
  }

  // Handles the user selecting a question option
  selectOption(option: string) {
    this.addUserMessage(option);
    this.showResetButton = false;

    // Determine which type of question was asked
    if (option.includes('riego')) this.currentQuestionType = 'watering';
    else if (option.includes('tipo')) this.currentQuestionType = 'species';
    else if (option.includes('adquirí')) this.currentQuestionType = 'acquisition';
    else if (option.includes('humedad')) this.currentQuestionType = 'humidity';

    // Ask the user to choose a specific plant
    setTimeout(() => {
      this.addBotMessage('¿De qué planta?');
      this.showPlantSelector = true;
    }, 300);
  }

  // Triggered when the user selects a plant
  onPlantSelected() {
    if (!this.selectedPlantId || !this.currentQuestionType) return;

    const plant = this.plants.find(p => p.id === this.selectedPlantId);
    if (!plant) return;

    this.addUserMessage(plant.name);
    this.showPlantSelector = false;

    const questionType = this.currentQuestionType;

    // Generate a bot response based on plant data
    setTimeout(() => {
      this.generateBotResponse(plant, questionType);
      this.currentQuestionType = undefined;
      this.selectedPlantId = null;
      this.showResetButton = true;
    }, 300);
  }

  // Generates the appropriate response based on the question type and plant data
  private generateBotResponse(plant: Plant, questionType: 'watering' | 'species' | 'acquisition' | 'humidity') {
    let response = '';

    switch(questionType) {
      case 'watering':
        response = plant.nextWateringDate
            ? `El próximo riego para tu ${plant.name} es el ${plant.nextWateringDate}.`
            : `No tengo registrada la fecha del próximo riego para ${plant.name}.`;
        break;
      case 'species':
        response = plant.species
            ? `Tu ${plant.name} es de la especie: ${plant.species}.`
            : `No tengo registrada la especie de ${plant.name}.`;
        break;
      case 'acquisition':
        response = plant.acquisitionDate
            ? `Adquiriste tu ${plant.name} el ${plant.acquisitionDate}.`
            : `No tengo registrada la fecha de adquisición de ${plant.name}.`;
        break;
      case 'humidity':
        response = plant.humidity
            ? `La humedad actual para tu ${plant.name} es: ${plant.humidity}.`
            : `No tengo registrada la humedad ideal para ${plant.name}.`;
        break;
    }

    // Send bot response and follow-up question
    this.addBotMessage(response);
    this.addBotMessage('¿Necesitas algo más?');
  }

  // Resets the conversation to its initial state
  resetConversation() {
    this.messages = [{ text: this.initialMessage, sender: 'bot' }];
    this.showResetButton = false;
  }
}
