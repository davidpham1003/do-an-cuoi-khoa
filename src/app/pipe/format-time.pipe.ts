import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value): any {
    return (value.split("T")[1].substring(0, value.split("T")[1].length - 4) + "0");
  }

}
