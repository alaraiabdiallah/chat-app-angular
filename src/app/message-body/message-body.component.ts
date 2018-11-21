import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-body',
  templateUrl: './message-body.component.html',
  styleUrls: ['./message-body.component.scss']
})
export class MessageBodyComponent implements OnInit {

  @Input() channel:Object;

  constructor() { }

  ngOnInit() {
  }

}
