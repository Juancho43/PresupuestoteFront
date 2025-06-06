import {Component, input, OnInit, signal} from '@angular/core';
import {IOwnable} from '@models/IOwnable';
import {OwnableCardComponent} from '@components/ownable/ownable-card/ownable-card-component';
import {OwnableSearcherComponent} from '@components/ownable/ownable-searcher/ownable-searcher.component';


@Component({
  selector: 'app-ownable-list-component',
  imports: [
    OwnableCardComponent,
    OwnableSearcherComponent,
  ],
  templateUrl: './ownable-list-component.html',
  standalone: true,
  styleUrl: './ownable-list-component.scss'
})
export class OwnableListComponent implements OnInit {
  readonly data = input.required<IOwnable[]>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
  ownableList = signal<IOwnable[]>([]);

  ngOnInit() {
    this.ownableList.set(this.data());
  }
  handleResults(results: IOwnable[]) {
    this.ownableList.set(results);
  }
}
