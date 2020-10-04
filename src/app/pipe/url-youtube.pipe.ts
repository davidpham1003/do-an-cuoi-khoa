import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlYoutube'
})
export class UrlYoutubePipe implements PipeTransform {

  transform(value:string) {
    let a = value.search('watch?v=')
    if(a != -1){
      return value.split('watch?v=')[0]+'embed/'+value.split('watch?v=')[1]
    }else{
      return value 
    }
  }

}
