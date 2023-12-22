export interface ILoginData {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    logs: [];
  };
}
