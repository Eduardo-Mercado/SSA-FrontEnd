import { FormGroup } from "@angular/forms";

export class DateFunction {

  construct() { }

  public get_TimeInverted(time: number) {
    let diff = time;
    const intervals = [
      [31536000, 'year'],
      [2592000, 'month'],
      [86400, 'day'],
      [3600, 'hour'],
      [60, 'minute']
    ];

    const intervalStrings = [];
    for (const interval of intervals) {
      const valor = Math.floor(diff / Number(interval[0]));
      if (valor > 0) {
        intervalStrings.push(valor + ' ' + interval[1] + ((valor > 1) ? 's' : ''));
        diff = diff % Number(interval[0]);
      }
    }

    return intervalStrings.join('');
  }
}

export function must_greatest(start: string, finish: string) {
  return (formGroup: FormGroup) => {
    const primaryControl = formGroup.controls[start];
    const secundaryControl = formGroup.controls[finish];

    if (primaryControl.errors && !secundaryControl.errors.mustGreatest) {
      return;
    }

    try {
      const date1 = primaryControl.value;
      const date2 = secundaryControl.value;
      if (date2) {
        const diff = Math.abs((date2.getTime() - date1.getTime()) / 100);
        console.log('diff :' + diff + ' diff/60 : ' + Math.floor(diff / 60));
        if (Math.floor(diff / 60) < 5) {
          console.log('error');
          secundaryControl.setErrors({ mustGreatest: true });
        } else {
          console.log('sin error')
          secundaryControl.setErrors(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}
