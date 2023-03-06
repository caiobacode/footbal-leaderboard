export interface IUsersInfo {
  email: string,
  password: string
}

export interface IServiceLogin {
  login(info: IUsersInfo): Promise<{ type: number, data: string | object }>;
}
