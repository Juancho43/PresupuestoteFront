import {Component, input} from '@angular/core';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-text-advise',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './text-advise.html',
  styleUrl: './text-advise.scss'
})
export class TextAdvise {
  readonly text = input.required<string>();
}
