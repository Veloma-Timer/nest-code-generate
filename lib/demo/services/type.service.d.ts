import { TypeEntity } from './../entities/App/type.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
export declare class TypeService {
    private readonly typeRepository;
    find(): Promise<TypeEntity[]>;
    create(data: TypeEntity): Promise<TypeEntity>;
    remove(id: number): Promise<DeleteResult>;
    update(id: number, data: TypeEntity): Promise<UpdateResult>;
}
