import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class RoutingGuard {
  constructor(
    private router: Router,
    private loginService: LoginService
    ){}

    canActivate(): boolean {
      if(this.loginService.isLogged()) {
        return true;
      }
      this.router.navigate(["login"]);
      return false;
    }
  }
