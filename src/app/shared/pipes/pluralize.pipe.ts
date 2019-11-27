import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'plural' })
export class PluralPipe implements PipeTransform {
  transform(singular: string, plural: string, count: number): string {
    return count === 1 ? singular : plural;
  }
}