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

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    MatCard,
    NgForOf,
    MatButton,
    NgIf,
    ChatbotMessage,
    MatLabel,
    MatSelect,
    MatFormField,
    FormsModule,
    MatOption,
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit {
  initialMessage = '¡Hola! Soy tu asistente de plantas. ¿En qué te puedo ayudar?';
  messages: ChatbotMessage[] = [
    { text: this.initialMessage, sender: 'bot' }
  ];

  botOptions = [
    '¿Cuándo es el siguiente riego?',
    '¿Qué tipo de planta es esta?',
    '¿Cuándo adquirí esta planta?',
    '¿Cuál es la humedad de mi planta?'
  ];

  plants: Plant[] = [];
  selectedPlantId: number | null = null;
  showPlantSelector = false;
  showResetButton = false;
  currentQuestionType: 'watering' | 'species' | 'acquisition' | 'humidity' | undefined;

  constructor(private plantService: PlantService) {}

  ngOnInit() {
    this.loadPlants();
  }

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


  addBotMessage(text: string) {
    this.messages.push({
      text,
      sender: 'bot'
    });
  }

  addUserMessage(text: string) {
    this.messages.push({
      text,
      sender: 'user'
    });
  }


  selectOption(option: string) {
    this.addUserMessage(option);
    this.showResetButton = false;


    if (option.includes('riego')) this.currentQuestionType = 'watering';
    else if (option.includes('tipo')) this.currentQuestionType = 'species';
    else if (option.includes('adquirí')) this.currentQuestionType = 'acquisition';
    else if (option.includes('humedad')) this.currentQuestionType = 'humidity';

    setTimeout(() => {
      this.addBotMessage('¿De qué planta?');
      this.showPlantSelector = true;
    }, 300);
  }

  onPlantSelected() {
    if (!this.selectedPlantId || !this.currentQuestionType) return;

    const plant = this.plants.find(p => p.id === this.selectedPlantId);
    if (!plant) return;

    this.addUserMessage(plant.name);
    this.showPlantSelector = false;


    const questionType = this.currentQuestionType;

    setTimeout(() => {
      this.generateBotResponse(plant, questionType);
      this.currentQuestionType = undefined;
      this.selectedPlantId = null;
      this.showResetButton = true;
    }, 300);
  }


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

    this.addBotMessage(response);
    this.addBotMessage('¿Necesitas algo más?');
  }


  resetConversation() {
    this.messages = [{ text: this.initialMessage, sender: 'bot' }];
    this.showResetButton = false;
  }
}