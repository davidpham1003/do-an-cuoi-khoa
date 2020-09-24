import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string, format: string): any {
    if (format == '1') {
      return (
        value.split('T')[0].split('-')[2] +
        '-' +
        value.split('T')[0].split('-')[1]
      );
    }else if(format === '2'){
      return (value.split('-')[2] + '-' + value.split('-')[1])
    }
  }
}
