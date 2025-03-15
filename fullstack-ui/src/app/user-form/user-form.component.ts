import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormFieldComponent } from '@app/shared/form-field/form-field.component';
import { NewUser } from '@app/types';

@Component({
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    username: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      suite: new FormControl(''),
      city: new FormControl('', { validators: [Validators.required] }),
      zipcode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^\d.*$/)]
      }),
      geo: new FormGroup({
        lat: new FormControl(''),
        lng: new FormControl('')
      })
    }),
    phone: new FormControl('', { validators: [Validators.required] }),
    website: new FormControl(''),
    company: new FormGroup({
      name: new FormControl('', { validators: [Validators.required] }),
      catchPhrase: new FormControl(''),
      bs: new FormControl('')
    })
  });

  submitForm() {
    const userFromForm: NewUser = {
      name: this.userForm.controls.name.value ?? '',
      username: this.userForm.controls.username.value ?? '',
      address: {
        street: this.userForm.controls.address.controls.street.value ?? '',
        suite: this.userForm.controls.address.controls.suite.value ?? undefined,
        city: this.userForm.controls.address.controls.city.value ?? '',
        zipcode: this.userForm.controls.address.controls.zipcode.value ?? '',
        geo: {
          lat: this.userForm.controls.address.controls.geo.controls.lat.value ?? undefined,
          lng: this.userForm.controls.address.controls.geo.controls.lng.value ?? undefined,
        }
      },
      phone: this.userForm.controls.phone.value ?? '',
      website: this.userForm.controls.website.value ?? undefined,
      company: {
        name: this.userForm.controls.company.controls.name.value ?? '',
        catchPhrase: this.userForm.controls.company.controls.catchPhrase.value ?? undefined,
        bs: this.userForm.controls.company.controls.bs.value ?? undefined,
      }
    }

    console.log("User to save", userFromForm);
  }
}
