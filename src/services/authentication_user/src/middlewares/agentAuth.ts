import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/verify-token";

const agentAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    //Get user token fom request header
    const tokenHeader = req.headers["authorization"] as string;
    const userToken = tokenHeader.split(" ")[1];

    //Decode token with JWT
    const user = verifyToken(userToken);

    //Check if user is not agent or admin
    if (!user.isAgent && !user.isAdmin) {
      return res.status(401).send("Unauthorized request");
    }

    //If user is agent or admin
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

export default agentAuth;
