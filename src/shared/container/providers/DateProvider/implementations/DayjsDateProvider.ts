import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider{
  
  compareInHours(start_date: Date, end_date: Date): number {
    const startDateFormated = this.convertToUTC(start_date);
    const endDateFormated = this.convertToUTC(end_date);
    const compare = dayjs(endDateFormated).diff(startDateFormated,"hours");

    return compare;
  }

  convertToUTC(date: Date): string {
    const  formatedDate = dayjs(date)
      .utc()
      .local()
      .format();
    return formatedDate;
  }

  addDays(date: Date): Promise<Date> {
    throw new Error("Method not implemented.");
  }

}

export { DayjsDateProvider }