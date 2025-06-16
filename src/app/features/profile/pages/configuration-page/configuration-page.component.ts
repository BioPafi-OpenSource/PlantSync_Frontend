import { Component } from '@angular/core';
import {
  ConfigurationFormComponent
} from "../../components/profile-configuration-form/profile-configuration-form.component";



@Component({
  selector: 'app-configuration-page',
  imports: [
    ConfigurationFormComponent
  ],
  templateUrl: './configuration-page.component.html',
  styleUrl: './configuration-page.component.css'
})
export class ConfigurationPageComponent {

}
