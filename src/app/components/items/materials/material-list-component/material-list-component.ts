import {Component, inject, input, OnInit, signal} from '@angular/core';
import {IPersonCardComponent} from '@components/people/person-card-component/i-person-card.component';
import {SearcherComponent} from '@components/people/searcher-component/searcher-component';
import {MaterialService} from '@services/http/material-service';
import {rxResource} from '@angular/core/rxjs-interop';
import {IPerson} from '@models/IPerson';
import {Material} from '@models/material';
import {MaterialComponent} from '@components/items/materials/material-component-component/material.component';
import {MaterialCardComponent} from '@components/items/materials/material-card-component/material-card-component';
import {RouterLink} from '@angular/router';
import {
  MaterialSearcherComponent
} from '@components/items/materials/material-search/material-searcher-component';

@Component({
  selector: 'app-material-list',
  imports: [
    IPersonCardComponent,
    SearcherComponent,
    MaterialComponent,
    MaterialCardComponent,
    RouterLink,
    MaterialSearcherComponent
  ],
  templateUrl: './material-list-component.html',
  styleUrl: './material-list-component.scss'
})
export class MaterialListComponent implements OnInit {
  private service = inject(MaterialService);
  readonly data = input<Material[]>([]);
  readonly option = input<boolean>(false);
  materialList = signal<Material[]>([])

  materialResource = rxResource({
    stream : () => this.service.getAll(),
  })

  ngOnInit() {
    this.materialList.set(this.data())
  }

  handleResults($event: any) {

  }
}
