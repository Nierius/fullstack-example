import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatError],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label?: string;
  @Input() control?: FormControl;
  @Input() type = 'text';

  get errorMessage(): string | null {
    if (this.control && this.control.errors && this.control.touched) {
      if (this.control.errors['required']) {
        return `${this.label} is required`;
      }
      if (this.control.errors['email']) {
        return `Invalid email format`;
      }
      if (this.control.errors['minlength']) {
        return `${this.label} must be at least ${this.control.errors['minlength'].requiredLength} characters`;
      }
      if (this.control.errors['maxlength']) {
        return `${this.label} must be less than ${this.control.errors['maxlength'].requiredLength} characters`;
      }
      if (this.control.errors['pattern']) {
        return `Invalid ${this.label} format`;
      }
    }
    return null;
  }

}
