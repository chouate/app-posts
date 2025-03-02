import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args=args.toLowerCase();
    return value.filter(function(post:any){
      return JSON.stringify(post).toLowerCase().includes(args);
    })
  }

}
