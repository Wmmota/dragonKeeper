import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public loginForm!: FormGroup;
  public errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
       this.router.navigateByUrl('/dragons');
      },
      (error) => {
        this.alert.error('', error.message);
      }
    );
  }

  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      userName: [, Validators.required],
      password: [, Validators.required]
    });
  }
}
