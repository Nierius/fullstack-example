import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormFieldComponent } from '@app/shared/form-field/form-field.component';
import { NewUser } from '@app/types';
import { UserService } from '@app/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Component({
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)] }),
    username: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required, Validators.maxLength(500)] }),
      suite: new FormControl(undefined, { validators: [Validators.maxLength(500)] }),
      city: new FormControl('', { validators: [Validators.required, Validators.maxLength(100)] }),
      zipcode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^\d.*$/), Validators.maxLength(20)]
      }),
      geo: new FormGroup({
        lat: new FormControl(undefined, { validators: [Validators.pattern(/^\-?\d+(\.\d+)?$/), Validators.maxLength(50)] }),
        lng: new FormControl(undefined, { validators: [Validators.pattern(/^\-?\d+(\.\d+)?$/), Validators.maxLength(50)] }),
      })
    }),
    phone: new FormControl('', { validators: [Validators.required, Validators.pattern(/^\+?\d+$/), Validators.maxLength(50)] }),
    website: new FormControl(undefined, { validators: [Validators.maxLength(200)] }),
    company: new FormGroup({
      name: new FormControl('', { validators: [Validators.required, Validators.maxLength(100)] }),
      catchPhrase: new FormControl(undefined, { validators: [Validators.maxLength(500)] }),
      bs: new FormControl(undefined, { validators: [Validators.maxLength(100)] })
    })
  });

  constructor(private readonly dialogRef: MatDialogRef<UserFormComponent>, private readonly userService: UserService, private readonly toastr: ToastrService) { }

  async submitForm() {
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
      },
    }

    await firstValueFrom(this.userService.createUser(userFromForm).pipe(catchError((err) => {
      this.toastr.error(err.error.message); return throwError(() => err)
    })));
    this.toastr.success("User created");
    this.dialogRef.close();
  }
}
