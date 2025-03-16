import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DialogService } from '@app/dialog.service';
import { User } from '@app/types';
import { UserService } from '@app/user.service';
import { firstValueFrom } from 'rxjs';

type TableFriendlyUser = Omit<User, "address" | "company"> & { address: string, company: string }

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: TableFriendlyUser[] = []
  displayedColumns = ["name", "username", "address", "phone", "website", "company", "actions"]

  constructor(private readonly userService: UserService, private readonly dialogService: DialogService) {
    this.userService.getUsers().pipe(takeUntilDestroyed()).subscribe((users) => this.users = users.map((user) => ({
      ...user,
      address: `${user.address.street} ${user.address.suite}, ${user.address.city}`,
      company: `${user.company.name}`
    })));
  }

  async deleteUser(userId: string) {
    await firstValueFrom(this.userService.deleteUser(userId));
  }

  openCreateUserDialog() {
    this.dialogService.openCreatUserDialog();
  }
}
