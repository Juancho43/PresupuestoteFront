import {Component, inject} from '@angular/core';
import {MaterialService} from '@services/http/material-service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-material-join',
  imports: [],
  templateUrl: './material-join.component.html',
  styleUrl: './material-join.component.scss'
})
export class MaterialJoinComponent {
  private service = inject(MaterialService);

  materialResource = rxResource(
    {
      stream:() => this.service.getAll(),
    }
  )
}
