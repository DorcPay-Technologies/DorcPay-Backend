import { Request, Response } from "express";
import userService from "../services/user/user.service";
import Controller from "../utils/decorators/controller.decorator";
import { Delete, Get, Post, Put } from "../utils/decorators/handlers.decorator";
import UserQuery from "../models/user-query";
import { IUser } from "../models/user";
import agentAuth from "../middlewares/agentAuth";
import adminAuth from "../middlewares/adminAuth";

@Controller("/api/users")
export default class UserController {
  //Create users handler
  @Post("/new")
  public createUser(req: Request, res: Response) {
    return userService.createUser(req, res);
  }

  //Login user handler
  @Post("")
  public login(req: Request, res: Response) {
    // Pass to necssary service
    return userService.loginUser(req, res);
  }

  //Update users handler
  //Adding the ID params in case a manual update needs to be implemented
  @Put("/:id")
  public updateUser(
    req: Request<{ id: number }, {}, IUser, {}>,
    res: Response
  ) {
    // pass details to necessary service
    return userService.updateUser(req, res);
  }

  //Delete user handler
  @Delete("/:id", [adminAuth])
  public deleteUser(req: Request<{ id: number }>, res: Response) {
    // Pass to necessary service
    return userService.removeUser(req, res);
  }

  //get specific user handler
  @Get("/:id")
  public getUser(req: Request<{ id: number }>, res: Response) {
    //pass to the necessary service
    return userService.getSingleUser(req, res);
  }

  //Get all users handler
  @Get("", [agentAuth])
  public getUsers(req: Request<{}, {}, {}, UserQuery>, res: Response) {
    //Pass to servreq: Request, res: Responseice
    return userService.getAllUsers(req, res);
  }
}
