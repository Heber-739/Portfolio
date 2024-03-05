import { DataUser } from 'src/app/interface/dataUser';

export interface JwtDto {
  token: string;
  type: string;
  username: string;
  authorities: string;
  user: DataUser | null;
}
