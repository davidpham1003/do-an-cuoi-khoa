import { Component, OnInit, Input } from '@angular/core';
import { ChangeThemeService } from 'src/app/core/Servers/change-theme.service';

@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.scss'],
})
export class TrangChuComponent implements OnInit {
  @Input() isLogin;
  isTheme: any;
  constructor(private data: ChangeThemeService) {}

  ngOnInit(): void {
    this.data.shareIsTheme.subscribe((data) => {
      this.isTheme = data;
    });
  }
}
