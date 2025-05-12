import Jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

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

export const verifyToken = (token: string, secret: string) => {
  return Jwt.verify(token, secret) as JwtPayload;
};
