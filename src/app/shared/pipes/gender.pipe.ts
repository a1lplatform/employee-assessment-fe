import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from "@shared/enums";

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1) {
      return Gender.Male
    }
    return Gender.Female
  }

}
