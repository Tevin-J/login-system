import { User } from 'src/app/models/user';

export interface TokenObject {
  token: string;
  userId: Pick<User, 'id'>;
}
