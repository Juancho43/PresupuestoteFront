import {Component, input, OnInit, signal} from '@angular/core';
import {Material} from '@models/material';
import {MaterialCardComponent} from '@components/items/materials/material-card/material-card';
import {MaterialSearcherComponent} from '@components/items/materials/material-searcher/material-searcher';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-material-list',
  imports: [MaterialCardComponent, MaterialSearcherComponent, CommonModule, RouterLink],
  templateUrl: './material-list.html',
  standalone: true,
  styleUrl: './material-list.scss'
})
export class MaterialListComponent implements OnInit {
  readonly data = input<Material[]>([]);
  readonly entity = signal<string>('materiale');
  readonly route = signal<string>('material');
  readonly action = signal<string>('material');
  readonly option = input<boolean>(false);
  materialList = signal<Material[]>([]);

  ngOnInit() {
    this.materialList.set(this.data());
  }

  handleResults(results: Material[]) {
    if(results.length > 0) this.materialList.set(results);
    if(results.length === 0) this.materialList.set(this.data());
  }
}
