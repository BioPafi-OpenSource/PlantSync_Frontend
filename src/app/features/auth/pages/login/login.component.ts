import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from "@angular/forms";

/**
 * LoginComponent handles user authentication by verifying email and password.
 * On successful login, the user is redirected to the plants page.
 */
@Component({
  selector: 'app-login', // Selector used to include this component in templates
  templateUrl: './login.component.html', // HTML template for the login form
  imports: [
    FormsModule, // Required for two-way binding with ngModel
    RouterLink    // Enables routerLink directive usage within the template
  ],
  styleUrls: ['./login.component.css'] // CSS styles specific to this component
})
export class LoginComponent {
  /** Stores the input email address from the login form */
  email = '';

  /** Stores the input password from the login form */
  password = '';

  /** Error message displayed when login credentials are invalid */
  error = '';

  /**
   * Injects the UserService for user-related operations and Router for navigation
   * @param userService - Service to fetch user data
   * @param router - Angular Router to navigate between routes
   */
  constructor(
      private userService: UserService,
      private router: Router
  ) {}

  /**
   * Attempts to log in the user by checking if the email exists and the password matches.
   * On success, stores the user in local storage and redirects to the '/plants' route.
   * On failure, sets an error message indicating incorrect credentials.
   */
  login() {
    this.userService.getUserByEmail(this.email).subscribe(users => {
      const user = users.find(u => u.password === this.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/plants']);
      } else {
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}

