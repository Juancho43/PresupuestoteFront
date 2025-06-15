import {Component, effect, input, OnInit, output, signal} from '@angular/core';
import {Material} from '@models/material';
import {MaterialCardComponent} from '@components/items/materials/material-card/material-card';
import {MaterialSearcherComponent} from '@components/items/materials/material-searcher/material-searcher';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PaginationButtons} from '@shared/pagination-buttons/pagination-buttons';
import {Pagination} from '@core/interfaces/ApiResponseCollection';

@Component({
  selector: 'app-material-list',
  imports: [MaterialCardComponent, MaterialSearcherComponent, CommonModule, RouterLink, PaginationButtons],
  templateUrl: './material-list.html',
  standalone: true,
  styleUrl: './material-list.scss'
})
export class MaterialListComponent implements OnInit {

  readonly data = input<Material[]>([]);
  readonly pagination = input<Pagination>({} as Pagination);
  readonly option = input<boolean>(false);

  readonly entity = signal<string>('materiale');
  readonly route = signal<string>('material');
  readonly action = signal<string>('material');

  paginationData = signal<Pagination>({} as Pagination);
  materialList = signal<Material[]>([]);

  selectedMaterial = output<Material>();
  pageChange = output<number>();

  ngOnInit() {
    this.paginationData.set(this.pagination());
    this.materialList.set(this.data());
  }

  handleResults(results: Material[]) {
    this.pageChange.emit(1);
    if(results.length > 0) this.materialList.set(results);
    if(results.length === 0) this.materialList.set(this.data());
  }

  selectMaterial(material: Material) {
    this.selectedMaterial.emit(material);
  }
}
