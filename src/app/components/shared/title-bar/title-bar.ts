import {Component, input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {NavigationButtons} from '@shared/navigation-buttons/navigation-buttons';

@Component({
  selector: 'app-title-bar',
  imports: [
    UpperCasePipe,
    NavigationButtons
  ],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.scss'
})
export class TitleBar {

  readonly title = input.required<string>();
}
