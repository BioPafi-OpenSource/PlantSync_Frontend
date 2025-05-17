
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from "../../../../shared/models/user";
import { UserService } from '../../services/user.service';
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  // Selector used to reference this component in HTML
  selector: 'app-register',

  // Path to the HTML template for this component
  templateUrl: './register.component.html',

  // Modules required by this component
  imports: [
    FormsModule,
    RouterLink
  ],

  // Path to the CSS stylesheet for this component
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Form fields and messages
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';

  // Inject the UserService and Router via the constructor
  constructor(
      private userService: UserService,
      private router: Router
  ) {}

  // Method triggered on form submission to handle user registration
  register() {
    // Create a new user object with the entered data
    const newUser = new User({
      name: this.name,
      email: this.email,
      password: this.password,
      plantIds: [] // Initially no associated plants
    });

    // Check if the email is already registered
    this.userService.getUserByEmail(this.email).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        // Show error if email already exists
        this.error = 'El correo ya está registrado.';
      } else {
        // Register the new user and display success message
        this.userService.registerUser(newUser).subscribe(() => {
          this.success = 'Registro exitoso. Redirigiendo al login...';
          // Redirect to login page after a short delay
          setTimeout(() => this.router.navigate(['/login']), 2000);
        });
      }
    });
  }
}

