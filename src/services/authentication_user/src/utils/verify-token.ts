import jwt from "jsonwebtoken";
import { signingOptions } from "./jwt-options";

export const verifyToken = (token: string) => {
  const decoded: jwt.JwtPayload = jwt.verify(
    token,
    process.env.JWT_PUBLIC_KEY,
    signingOptions
  ) as jwt.JwtPayload;

  return decoded;
};
