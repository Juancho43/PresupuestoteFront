import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MaterialComponent} from '@components/items/materials/material-component-component/material.component';
import {MaterialListComponent} from '@components/items/materials/material-list-component/material-list-component';

@Component({
  selector: 'app-material-view',
  imports: [
    RouterLink,
    MaterialComponent,
    MaterialListComponent
  ],
  templateUrl: './material-view-component.html',
  styleUrl: './material-view-component.scss'
})
export class MaterialViewComponent {

}
