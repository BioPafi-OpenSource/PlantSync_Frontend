import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { User} from "../../../../shared/models/user";
import { UserService } from '../../services/user.service';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(
      private userService: UserService,
      private router: Router
  ) {}

  register() {
    const newUser = new User({
      name: this.name,
      email: this.email,
      password: this.password,
      plantIds: []
    });

    this.userService.getUserByEmail(this.email).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        this.error = 'El correo ya está registrado.';
      } else {
        this.userService.registerUser(newUser).subscribe(() => {
          this.success = 'Registro exitoso. Redirigiendo al login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        });
      }
    });
  }
}
