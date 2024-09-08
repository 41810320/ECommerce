import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObJect: any[]  , term:string): any[] {
    return arrayOfObJect.filter( (item)=> item.title.toLowerCase().includes(term.toLowerCase()) );
  }

}
