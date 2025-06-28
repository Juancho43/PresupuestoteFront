import {Component, input} from '@angular/core';
import {User} from '@models/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly user = input.required<User>();
}
