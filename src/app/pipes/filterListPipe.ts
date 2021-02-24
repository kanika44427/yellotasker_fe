import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterlist"
})
export class FilterlistPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) return value;
    if(value) return value.filter(item => item.status.localeCompare(args) == 0);
  }
}
