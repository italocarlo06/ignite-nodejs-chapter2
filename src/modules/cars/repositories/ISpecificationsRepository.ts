import { CreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
    create({ name, description }: CreateSpecificationDTO):Promise<Specification>;
    findByName(name:string):Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
    list():Promise<Specification[]>;

}

export { ISpecificationsRepository }