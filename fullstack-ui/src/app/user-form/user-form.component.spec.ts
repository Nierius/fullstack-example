import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserFormComponent } from './user-form.component'
import { MatDialogRef } from '@angular/material/dialog'
import { provideHttpClient } from '@angular/common/http'
import { provideToastr } from 'ngx-toastr'

describe('UserFormComponent', () => {
  let component: UserFormComponent
  let fixture: ComponentFixture<UserFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        provideHttpClient(),
        provideToastr(),
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(UserFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
