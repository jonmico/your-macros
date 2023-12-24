export interface ILoginData {
  isAuthenticated: boolean;
  user: {
    _id: string;
    email: string;
    logs: [];
  };
}
