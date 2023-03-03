export interface IUsersInfo {
  email: string,
  password: string
}

export interface IServiceLogin {
  login(info: IUsersInfo): Promise<string>;
}
