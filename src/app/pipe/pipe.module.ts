import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';
import { FormatTimePipe } from './format-time.pipe';
import { FormatStringPipe } from './format-string.pipe';
import { SafePipe } from './safe.pipe';
import { UrlYoutubePipe } from './url-youtube.pipe';
import { FormatCurrencyPipe } from './format-currency.pipe';

@NgModule({
  declarations: [FormatDatePipe, FormatTimePipe, FormatStringPipe, SafePipe, UrlYoutubePipe, FormatCurrencyPipe],
  imports: [
    CommonModule
  ],
  exports:[FormatDatePipe,FormatTimePipe,FormatStringPipe,SafePipe,UrlYoutubePipe,FormatCurrencyPipe]
})
export class PipeModule { }
