import {Component, input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-title-bar',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBar {

  readonly title = input.required<string>();
}
