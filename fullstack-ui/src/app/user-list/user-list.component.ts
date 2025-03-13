import { Component, OnInit } from '@angular/core';
import { User } from '@app/types';
import { UserService } from '@app/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  users: User[] = []

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(take(1)).subscribe((users) => this.users = users);
  }
}
