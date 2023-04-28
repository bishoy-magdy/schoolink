export default interface User {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    authType: 'password' | 'token',
    authValue: string,
}
