import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Filter the items based on your search criteria
      // For example, if you want to filter based on a specific property 'name':
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
