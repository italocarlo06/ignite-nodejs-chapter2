interface IDateProvider {
  compareInHours( start_date: Date, end_date: Date): number;
  compareInDays( start_date: Date, end_date: Date): number;
  addDays(date:Date): Promise<Date>;
  convertToUTC(date: Date): string;
  dateNow():Date;

}

export { IDateProvider };