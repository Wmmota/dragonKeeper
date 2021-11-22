import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user-model.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private readonly TOKEN_AUTHENTICATION: string = 'authentication-token';

  setLocalStorageItem(user: UserModel) {
    localStorage.setItem(this.TOKEN_AUTHENTICATION, JSON.stringify(user));
  }

  logout() : void {
    localStorage.removeItem(this.TOKEN_AUTHENTICATION);
  }

  mockUserReturn(user: UserModel): boolean {
    if(user.userName === 'sicredi' && user.password === 'sicredi2021') {
      return true;
    }
    return false;
  }

  login(user: UserModel): Observable<any> {
      return new Observable(observer => {
        setTimeout(() => {
          if(this.mockUserReturn(user)) {
            this.setLocalStorageItem(user);
            observer.next({message: 'Logado com sucesso'});
            return observer.complete();
          }

          observer.error({message: 'Nome de usuário e/ou senha inválidos'});
          observer.next(false);
          return observer.complete();
        }, 1000)
      })
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.TOKEN_AUTHENTICATION);
  }
}
