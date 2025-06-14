import {Component} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home-component',
  imports: [NgOptimizedImage],
  templateUrl: './home-component.html',
  standalone: true,
  styleUrl: './home-component.scss'
})
export class HomeComponent {

}
