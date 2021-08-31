import { CreateSpecificationDTO } from "../dtos/CreateSpecificationDTO";
import { Specification } from "../models/Specification";

interface ISpecificationsRepository {
    create({ name, description }: CreateSpecificationDTO):void;
    findByName(name:string):Specification
    list():Specification[];

}

export { ISpecificationsRepository }