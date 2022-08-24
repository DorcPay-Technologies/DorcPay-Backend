import jwt from "jsonwebtoken";
import { signingOptions } from "./jwt-options";

export const signPayload = (payload: jwt.JwtPayload) => {
  const jwtSecret: jwt.Secret = process.env.JWT_PRIVATE_KEY;

  const token = jwt.sign(payload, jwtSecret, signingOptions);

  return token;
};
