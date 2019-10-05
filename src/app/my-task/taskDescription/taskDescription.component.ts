import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'task-popup',
  templateUrl: './taskDescription.component.html'
})
export class TaskDescriptionComponent  implements OnInit {
  ngOnInit() {
    window.scrollTo(0,0);
  }
}