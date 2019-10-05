import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'routing-root',
  templateUrl: './help.component.html'
})
export class HelpComponent  implements OnInit {
  ngOnInit() {
    window.scrollTo(0,0);
  }
}
