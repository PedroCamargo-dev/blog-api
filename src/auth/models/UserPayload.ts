export interface UserPayload {
  sub: number;
  username: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
