import { UserStorageInterface } from "./UserStorageInterface";
import { JwtServiceInterface } from "./JwtServiceInterface";
import { User } from "./User";
import { PaymentManagerInterface } from "./PaymentManagerInterface";

export class CoreService {
    constructor(
        public userStorage: UserStorageInterface,
        private readonly jwtService: JwtServiceInterface,
        public readonly paymentManager: PaymentManagerInterface
    ) {}

    public async getAllUsers(): Promise<User[]> {
        const users: User[] = [];
        const count = await this.userStorage.count();
        if(count > 0) {
            const ids = await this.userStorage.ids();
            for(const id of ids) {
                const user = await this.userStorage.getById(id);
                users.push(user);
            }
        }
        return users;
    }

    public async login(username: string): Promise<string> {
        const users = await this.userStorage.getAll();
        let token: string;
        for(const user of users) {
            if(user.username === username) {
                token = this.jwtService.sign({id: user.id});
            }
        }
        if(token && token.length) {
            return token;
        } else {
            return null;
        }
    }

    public async removeUser(userId: number): Promise<PaymentManagerInterface> {
        const user = await this.userStorage.getById(userId);
        const money = await this.paymentManager.getBalance(user);
        return this.paymentManager;
    }

    public async rename(id: number, username: string): Promise<User> {
        const user = await this.userStorage.getById(id);
        user.username = username;
        await this.userStorage.update(user);
        return user;
    }
}
