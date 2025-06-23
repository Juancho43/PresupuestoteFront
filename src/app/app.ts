import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from '@shared/navbar/navbar';
import {SpinnerComponent} from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, SpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title =signal('Presupuestote');
}
