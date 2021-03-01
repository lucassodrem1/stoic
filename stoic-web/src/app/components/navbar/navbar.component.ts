import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() username: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (!token) this.router.navigate(['']);
  }
}
