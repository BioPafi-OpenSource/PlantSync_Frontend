import { Component, OnInit } from '@angular/core';
import {ChatbotComponent} from "../../components/chatbot/chatbot.component";



@Component({
  selector: 'app-chatbot-view',
  standalone: true,
  imports: [
    ChatbotComponent

  ],
  templateUrl: './chatbot-view.component.html',
  styleUrl: './chatbot-view.component.css'
})
export class ChatbotViewComponent  {



}