import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-background',
  templateUrl: './spinner-background.component.html',
  styleUrls: ['./spinner-background.component.scss'],
})
export class SpinnerBackgroundComponent implements OnInit {
  isLoading: boolean = true;
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }
}
