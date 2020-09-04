import { User } from "./User";

export interface PaymentManagerInterface {
    eraseBalance(user: User): Promise<void>;
    getBalance(user: User): Promise<void>;
}
