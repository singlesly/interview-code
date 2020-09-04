import { User } from "./User";

export interface UserStorageInterface<ID = number> {
    count(): Promise<number>;
    ids(): Promise<ID[]>;
    getAll(): Promise<User[]>;
    getByUsername(username: string): Promise<User>;
    getById(id: ID): Promise<User>;
    update(user: User): Promise<User>;
    add(user: User): Promise<void>;
    remove(id: ID): Promise<void>;
}
