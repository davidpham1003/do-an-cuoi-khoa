import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isThemes:boolean;
  constructor(private changeTheme : ChangeThemeService) { }

  ngOnInit(): void {
    this.changeTheme.shareIsTheme.subscribe(data=>{
      this.isThemes = data
    })
  }

}
