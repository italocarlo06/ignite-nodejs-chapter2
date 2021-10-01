import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

enum FormatCompare {
  Hours = "hours",
  Days = "days"
}

class DayjsDateProvider implements IDateProvider{


  compare(start_date: Date, end_date:Date, type:FormatCompare): number{  
      const startDateFormated = this.convertToUTC(start_date);
      const endDateFormated = this.convertToUTC(end_date);
      const compare = dayjs(endDateFormated).diff(startDateFormated,type);
  
      return compare;
  }

  compareInDays(start_date: Date, end_date: Date): number {
    return this.compare(start_date,end_date, FormatCompare.Days);
  }
  
  compareInHours(start_date: Date, end_date: Date): number {
    return this.compare(start_date,end_date, FormatCompare.Hours);
  }


  convertToUTC(date: Date): string {
    const  formatedDate = dayjs(date)
      .utc()
      .local()
      .format();
    return formatedDate;
  }


  dateNow(): Date {
    return dayjs().toDate();
  }

  addDays(days: number): Date{
    return dayjs().add(days,"days").toDate();
  }  

  addHours(hours: number): Date {
    return dayjs().add(hours,"hours").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }  

}

export { DayjsDateProvider }