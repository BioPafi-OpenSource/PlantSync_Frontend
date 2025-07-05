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

  toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }

  ngOnInit() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
      document.body.classList.add('dark-mode');
    }
  }

}
