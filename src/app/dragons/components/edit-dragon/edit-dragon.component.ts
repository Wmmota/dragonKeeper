import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { DragonInterface } from '../../models/dragon-interface';
import { DragonService } from '../../services/dragon.service';

@Component({
  selector: 'app-edit-dragon',
  templateUrl: './edit-dragon.component.html',
  styleUrls: ['./edit-dragon.component.scss']
})
export class EditDragonComponent implements OnInit {

  originalDragon: DragonInterface = new DragonInterface({});
  isSubmitted: boolean = false;
  editDragonForm!: FormGroup;
  editDragonErrorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dragonService: DragonService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.originalDragon = new DragonInterface(data.dragon);
        this.createEditDragonForm(new DragonInterface(data.dragon));
      }
    );
  }

  createEditDragonForm(dragon: DragonInterface) {
    this.editDragonForm = this.formBuilder.group({
      name: [dragon.name, Validators.required],
      type: [dragon.type, Validators.required]
    });
  }

  submitEditDragon() {
    this.isSubmitted = true;
    this.editDragonErrorMessage = '';

    if (this.editDragonForm.invalid) {
      return;
    }

    this.dragonService.editDragon(this.originalDragon.id, this.editDragonForm.value)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe({
        next: event => {
          this.router.navigateByUrl('/dragons');
        },
        error: error => {
          this.alert.error('Erro ao editar dragão', error.message);
        },
      });

  }

}
