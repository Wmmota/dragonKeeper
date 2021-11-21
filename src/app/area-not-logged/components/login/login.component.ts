import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createFormLogin()
  }

  login(){
    console.log('login')
  }

  createFormLogin() {
    this.formLogin = this.formBuilder.group({
      userName: ['userName', Validators.required],
      password: ['password', Validators.required]
    });
  }

}
