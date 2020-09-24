import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value:number){
    return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
  }

}
