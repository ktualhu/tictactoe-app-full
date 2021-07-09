export declare class User {
    username: string;
}
export declare class UsersService {
    private readonly users;
    private currentUser;
    findOne(username: string): Promise<User | undefined>;
    getCurrentUser(): Promise<User> | null;
    setCurrentUser(user: User): void;
}
