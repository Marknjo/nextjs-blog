import { hash } from 'bcryptjs';
import { has } from 'lodash';

export async function hashedPassword(password) {
  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}
