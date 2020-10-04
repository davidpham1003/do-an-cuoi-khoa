import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tin-tuc',
  templateUrl: './tin-tuc.component.html',
  styleUrls: ['./tin-tuc.component.scss']
})
export class TinTucComponent implements OnInit {
  @Input() isTheme
  constructor() { }

  ngOnInit(): void {
  }

}
