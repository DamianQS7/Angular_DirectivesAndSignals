import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user-request';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {
  
  private usersService: UsersService = inject(UsersService);
  
  public userId = signal<number>(1);
  public currentUser = signal<User | undefined>(undefined);
  public userFound = signal<boolean>(true);
  public fullName = computed<string>( () => {
    if(!this.currentUser()) return 'User not found';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  });
  
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  public loadUser(id: number): void {
    if( id <= 0 ) return;

    this.userId.set(id);

    this.usersService.getUserById(id)
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.userFound.set(true);
        },
        error: () => this.userFound.set(false)
      });
  }
}
