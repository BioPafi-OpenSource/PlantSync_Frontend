import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/user.service';
import { User} from "../../../../shared/models/user";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
      private userService: UserService,
      private router: Router
  ) {}

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
