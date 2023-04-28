import User from '../../types/user';

export default interface UserDAO {
    createUser(user: User): Promise<void>,
    getUserByUsername(username: string): Promise< User | undefined>,
    getUserById(id: string): Promise <User | undefined>,
    getUserByEmail(email: string): Promise <User | undefined>,
}
