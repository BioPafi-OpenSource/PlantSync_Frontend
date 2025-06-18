import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { UserService} from "../../../auth/services/user.service";
import { Profile } from '../../model/profile.entity';
import { User} from "../../../auth/model/user.entity";
import { MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-configuration-form',
  templateUrl: './profile-configuration-form.component.html',
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel,

  ],
  styleUrls: ['./profile-configuration-form.component.css']
})
export class ConfigurationFormComponent implements OnInit {
  form!: FormGroup;
  currentUser!: User;
  currentUserId!: number;
  profileId!: number;

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserId = currentUser.id;

    this.form = this.fb.group({
      name: ['', Validators.required],
      subscriptionPlan: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadData();
  }

  loadData(): void {

    this.profileService.getById(this.currentUserId).subscribe((profile: Profile) => {
      this.profileId = profile.id;
      this.form.patchValue({
        name: profile.name,
        subscriptionPlan: profile.subscriptionPlan
      });
    });

    this.userService.getById(this.currentUserId).subscribe((user: User) => {
      this.form.patchValue({ email: user.email });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { name, subscriptionPlan, email } = this.form.value;

    const updatedProfile = new Profile({
      id: this.profileId,
      userId: this.currentUserId,
      name,
      subscriptionPlan
    });

    this.profileService.update(this.profileId, updatedProfile).subscribe(() => {
      console.log('Perfil actualizado');
    });

    const updatedUser = { ...this.currentUser, email };

    this.userService.updateUser(this.currentUser.id, updatedUser).subscribe(() => {
      console.log('Correo actualizado');
    });
  }


}
