type CreateRentalDTO = {
  car_id: string;
  user_id: string;  
  expected_return_date:Date;
  total?: number;
}

export { CreateRentalDTO }