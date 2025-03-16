import { Component } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { DialogService } from '@app/services/dialog.service'
import { User } from '@app/types'
import { UserService } from '@app/services/user.service'
import { ToastrService } from 'ngx-toastr'
import { catchError, firstValueFrom, throwError } from 'rxjs'

type TableFriendlyUser = Omit<User, 'address' | 'company'> & {
  address: string
  company: string
}

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: TableFriendlyUser[] = []
  displayedColumns = [
    'name',
    'username',
    'address',
    'phone',
    'website',
    'company',
    'actions',
  ]

  constructor(
    private readonly userService: UserService,
    private readonly dialogService: DialogService,
    private readonly toastr: ToastrService
  ) {
    this.userService
      .getUsers()
      .pipe(takeUntilDestroyed())
      .subscribe(
        (users) =>
          (this.users = users.map((user) => ({
            ...user,
            address: `${user.address.street} ${user.address.suite}, ${user.address.city}`,
            company: `${user.company.name}`,
          })))
      )
  }

  async deleteUser(userId: string) {
    await firstValueFrom(
      this.userService.deleteUser(userId).pipe(
        catchError((err) => {
          this.toastr.error('Failed to remove user. Try again later')
          return throwError(() => err)
        })
      )
    )
    this.toastr.success('User removed')
  }

  openCreateUserDialog() {
    this.dialogService.openCreatUserDialog()
  }
}
