import { DataUser } from 'src/app/Interface/dataUser';

export interface JwtDto {
  token: string;
  type: string;
  username: string;
  authorities: string;
  user: DataUser | null;
}
