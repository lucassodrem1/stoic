import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.cookieService.get('token')) this.router.navigate(['home']);

    this.addFadeInNav();
    this.scrollBarEffect();

    this.loginForm = new FormGroup({
      loginUsername: new FormControl('', Validators.required),
      loginPassword: new FormControl('', Validators.required),
    });

    this.signupForm = new FormGroup({
      signupUsername: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      signupPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      signupPasswordConf: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  // Efeito para alterar background da navbar
  // ao scrollar.
  scrollBarEffect() {
    document.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');

      if (window.pageYOffset != 0 && !navbar.classList.contains('scroll-bar'))
        return navbar.classList.add('scroll-bar');

      if (window.pageYOffset === 0) navbar.classList.remove('scroll-bar');
    });
  }

  addFadeInNav() {
    const nav = document.querySelector('nav');
    nav.addEventListener('mouseover', this.hoverEffect.bind(0.5));

    nav.addEventListener('mouseout', this.hoverEffect.bind(1));
  }

  // Efeito para mudar opacidade dos links na navbar.
  hoverEffect(e) {
    if (!e.target.classList.contains('nav-link')) return;

    const navItems = e.target.closest('nav').querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item != e.target) item.style.opacity = this;
    });
  }

  get loginUsername() {
    return this.loginForm.get('loginUsername');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  get signupUsername() {
    return this.signupForm.get('signupUsername');
  }

  get signupPassword() {
    return this.signupForm.get('signupPassword');
  }

  get signupPasswordConf() {
    return this.signupForm.get('signupPasswordConf');
  }

  public userSignup() {
    this.authService.signup(this.signupForm.value).subscribe(
      res => {
        this.cookieService.set('token', res.token, { expires: 90 });
        this.router.navigate(['home']);
      },
      error => {
        alert(error.error.message);
      }
    );
  }

  public userLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      res => {
        this.cookieService.set('token', res.token, { expires: 90 });
        this.router.navigate(['home']);
      },
      error => {
        alert(error.error.message);
      }
    );
  }
}
