import { DeleteResult, UpdateResult } from 'typeorm';
import { TypeEntity } from './../entities/App/type.entity';
import { TypeService } from './../services/App/type.service';
export declare class TypeController {
    private readonly typeService;
    constructor(typeService: TypeService);
    find(): Promise<TypeEntity[]>;
    create(data: TypeEntity): Promise<TypeEntity>;
    remove(id: number): Promise<DeleteResult>;
    update(id: number, data: TypeEntity): Promise<UpdateResult>;
}
