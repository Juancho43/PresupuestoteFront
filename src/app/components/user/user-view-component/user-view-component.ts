import {Component, inject} from '@angular/core';
import {UserComponent} from '@components/user/user/user.component';
import {UserService} from '@services/http/user-service';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-view-component',
  imports: [
    UserComponent
  ],
  standalone:true,
  templateUrl: './user-view-component.html',
  styleUrl: './user-view-component.scss'
})
export class UserViewComponent {
  private service = inject(UserService);
  userResource = rxResource({
    stream:()=>{
      return this.service.getCurrentUser();
    }
  })

}
