import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '@shared/navbar/navbar';
import {TitleBar} from '@shared/title-bar/title-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, TitleBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title =signal('Presupuestote');
}
