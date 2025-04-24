import Jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; userRole: string },
  secret: string,
  expiresIn: string,
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'], 
  };

  return Jwt.sign(jwtPayload, secret as Secret, options);
};
