import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragonInterface } from '../../models/dragon-interface';

@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit {

  dragon: DragonInterface = new DragonInterface();

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data) => {
        this.dragon = new DragonInterface(data.dragon);
      }
    );
  }

}
