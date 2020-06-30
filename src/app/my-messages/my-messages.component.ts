import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'routing-root',
  templateUrl: './my-messages.component.html'
})
export class MyMessagesComponent  implements OnInit {
  ngOnInit() {
    window.scrollTo(0,0);
  }
}
