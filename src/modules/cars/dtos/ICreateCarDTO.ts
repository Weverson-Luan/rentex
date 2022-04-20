import { Specification } from "../infra/typeorm/entity/Specification";

interface ICreateCarDTO {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  available?: boolean;
  category_id: string;
  created_at?: Date;
  specifications?: Specification[]
}

export { ICreateCarDTO };