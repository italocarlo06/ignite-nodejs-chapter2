import { CreateSpecificationDTO } from "../dtos/CreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
    create({ name, description }: CreateSpecificationDTO):Promise<void>;
    findByName(name:string):Promise<Specification>;
    list():Promise<Specification[]>;

}

export { ISpecificationsRepository }