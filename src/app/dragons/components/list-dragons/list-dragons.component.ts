import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragonService } from '../../services/dragon.service';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/area-not-logged/services/login.service';
import { DragonInterface } from '../../models/dragon-interface';


@Component({
  selector: 'app-list-dragons',
  templateUrl: './list-dragons.component.html',
  styleUrls: ['./list-dragons.component.scss']
})
export class ListDragonsComponent implements OnInit {

  dragonsList: Array<DragonInterface> = [];
  listErrorMessage: string = '';
  public paginaAtual = 1;

  constructor(
    private dragonService: DragonService,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
  this.getDragons();
  }

  getDragons(){
    this.dragonService.getDragons()
    .subscribe((response)=>{
      this.dragonsList = response;
    }, (error)=>{
      this.listErrorMessage = (error && error.message) ? error.message : 'Houve um problema ao obter os dragões.';
    })
}

  removeDragonFromArray(dragonIdRemoved: string) {
    this.dragonsList.forEach((dragon, index) => {
      if(dragon.id === dragonIdRemoved) {
        this.dragonsList.splice(index, 1);
      }
    });
  }

  deleteDragon(dragonId: string) {
    this.dragonService.deleteDragon(dragonId)
    .pipe(
      finalize(() => {
      })
    )
    .subscribe({
      next: () => {
        this.removeDragonFromArray(dragonId);
      },
      error: error => {
        this.listErrorMessage = (error && error.message) ? error.message : 'Houve um problema ao tentar remover o dragão.';
      },
    });
  }

  redirectShowDetailsDragon(dragonId: string) {
    this.router.navigate(['/dragons/detail', dragonId]);
  }

  redirectEditDragon(dragonId: string) {
    this.router.navigate(['/dragons/edit', dragonId]);
  }

  redirectCreateDragon() {
    this.router.navigate(['/dragons/create']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
