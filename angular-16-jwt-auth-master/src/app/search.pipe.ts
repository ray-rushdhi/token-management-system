import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   if (!value) return null;
  //   if (!args) return value;

  //   args = args.toLowerCase();

  //   return value.map((item: any) => {
  //     // Convert the item to a string and make it lowercase
  //     const strItem = JSON.stringify(item).toLowerCase();

  //     // Find the index of the matched text
  //     const index = strItem.indexOf(args);

  //     // If the text is found, create a new string with the matched text highlighted
  //     if (index !== -1) {
  //       const start = index;
  //       const end = index + args.length;
  //       const highlightedText =
  //         item.slice(0, start) + '<span class="highlight">' + item.slice(start, end) + '</span>' + item.slice(end);
  //       return highlightedText;
  //     }

  //     // If no match is found, return the original item
  //     return item;
  //   });
  // }

  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;

    args = args.toLowerCase();

    return value.filter((item: any)=>{
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}
