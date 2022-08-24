import { SignOptions } from "jsonwebtoken";

export const signingOptions: SignOptions = {
  expiresIn: "2h",
  algorithm: "RS256",
};
