import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {

    this.currentUser$ = this.authService.currentUser;
  }

  logout() {
    this.authService.logout()
  }


}
