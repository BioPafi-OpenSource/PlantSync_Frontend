import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProfileService} from "../../../profile/services/profile.service";
import { User} from "../../model/user.entity";
import { Profile} from "../../../profile/model/profile.entity";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';
  selectedPlan: 'basic' | 'premium' | 'pro' = 'basic';

  constructor(
      private userService: UserService,
      private profileService: ProfileService,
      private router: Router
  ) {}

  register() {

    this.userService.getUserByEmail(this.email).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        this.error = 'El correo ya está registrado.';
        return;
      }


      const newUser = new User({
        email: this.email,
        password: this.password
      });

      this.userService.registerUser(newUser).subscribe({
        next: (createdUser) => {
          console.log('Plan seleccionado:', this.selectedPlan); // Para debug
          const newProfile = new Profile({
            userId: createdUser.id,
            name: this.name,
            subscriptionPlan: this.selectedPlan
          });
          console.log('Perfil a crear:', newProfile); // Para debug
          this.profileService.createProfile(newProfile).subscribe({
            next: () => {
              this.success = 'Registro exitoso. Redirigiendo al login...';
              setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
              this.error = 'Error al crear el perfil: ' + err.message;
              console.error('Profile creation error:', err);
            }
          });
        },
        error: (err) => {
          this.error = 'Error al registrar el usuario: ' + err.message;
          console.error('User registration error:', err);
        }
      });
    });
  }
}