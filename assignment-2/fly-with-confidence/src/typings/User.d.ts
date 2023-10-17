export interface User {
  userName: string,
  email: string,
  password: string,
  avatar?: string,
}

export interface UserCredentials {
  userName: string,
  password: string,
}
