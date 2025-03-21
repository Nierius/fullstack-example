import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserListComponent } from './user-list.component'
import { provideHttpClient } from '@angular/common/http'
import { provideToastr } from 'ngx-toastr'

describe('UserListComponent', () => {
  let component: UserListComponent
  let fixture: ComponentFixture<UserListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [provideHttpClient(), provideToastr()],
    }).compileComponents()

    fixture = TestBed.createComponent(UserListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
