import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userInfo: User;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');

    this.userService.getUser(token).subscribe(res => {
      this.userInfo = res.data;
    });
  }

  putDecoration(btn: String) {
    (document.querySelector(
      '#feed-input'
    ) as HTMLTextAreaElement).value += `<${btn}></${btn}>`;
  }
}
