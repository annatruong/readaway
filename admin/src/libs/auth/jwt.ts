import { sign } from 'jsonwebtoken';
import { UserData } from 'types/userTypes';

async function createToken(userData: UserData) {
  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('missing auth required parameter');
    }

    const accessToken = sign({ userData }, jwtSecret, { expiresIn: '30d' });
    return accessToken;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('unknown error');
  }
}

export default {
  createToken,
};
