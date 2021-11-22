import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { DragonInterface } from '../../models/dragon-interface';
import { DragonService } from '../../services/dragon.service';

@Component({
  selector: 'app-create-dragon',
  templateUrl: './create-dragon.component.html',
  styleUrls: ['./create-dragon.component.scss']
})
export class CreateDragonComponent implements OnInit {

  isSubmitted: boolean = false;
  createDragonForm!: FormGroup;
  createDragonErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dragonService: DragonService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.createNewDragonForm(new DragonInterface());
  }

  createNewDragonForm(dragon: DragonInterface) {
    this.createDragonForm = this.formBuilder.group({
      name: [dragon.name, Validators.required],
      type: [dragon.type, Validators.required],
      createdAt: [dragon.createdAt],
    });
  }

  submitCreateDragon() {
    this.isSubmitted = true;
    this.createDragonErrorMessage = '';

    if (this.createDragonForm.invalid) {
      return;
    }

    this.createDragonForm.controls.createdAt.setValue((new Date()).toISOString())

    this.dragonService.createDragon(this.createDragonForm.value)
      .subscribe({
        next: event => {
          this.router.navigateByUrl('/dragons');
        },
        error: error => {
          console.log(error)
          this.alert.error('Erro ao criar dragão', error.message);
        },
      });

  }

}
