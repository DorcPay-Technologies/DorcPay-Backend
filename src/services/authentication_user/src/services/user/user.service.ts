//Import repository
import { userRepository } from "../../config/data-source";

// Import utilities
import { makeUser, validateUser, signPayload } from "./utils";
import _ from "lodash";
import bcrypt from "bcrypt";

//Import Interfaces
import { IUser } from "../../models/user";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../config/entity/User";
import UserQuery from "../../models/user-query";

class UserService {
  userRepo: Repository<User>;

  constructor() {
    this.userRepo = userRepository;
  }

  async createUser(req: Request<{}, {}, IUser, {}>, res: Response) {
    // Will validate user input, check if user already exists then create the user
    // Will return token of user to automatically login user

    try {
      // extract user from request body

      const user = req.body;

      //Validate User
      const isValidUser = validateUser(user);

      // If user input is  not valid
      if (isValidUser.error) {
        return res.status(400).send("Bad request");
      }

      //   Check if user with email already exists
      const check = await this.userRepo.findOne({
        where: { email: user.email },
      });

      //   If user exists send error
      if (check) return res.status(400).send("User with email already exist");

      //   Create new user
      const newUser = await makeUser(user);

      //   Create user to database format of the new user
      const dbUser = this.userRepo.create(newUser);

      //   Save the new user to database
      const result = await this.userRepo.save(dbUser);

      const token = signPayload(_.pick(result, ["id", "isAdmin", "isAgent"]));

      // Return a token of the user
      return res.status(200).send(token);
    } catch (error) {
      // return res.status(500).send("Server error");
      throw new Error(error);
    }
  }

  async getSingleUser(req: Request<{ id: number }, {}, {}, {}>, res: Response) {
    // Checks for the user with ID
    // Return error id user is not found
    // Return user if user is found
    try {
      const user = await this.userRepo.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!user) return res.status(404).send("User not found");

      return res.status(200).send(_.omit(user, ["password"]));
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  async getAllUsers(req: Request<{}, {}, {}, UserQuery>, res: Response) {
    // To get all the users in the database
    // Will set all the filter parameters and pagination
    try {
      const { city, dateOfBirth, firstName, lastName, limit, page } = req.query;

      const defaultPage = page ? page : 1;
      const pageLimit = limit ? limit : 0;

      const result = await this.userRepo.find({
        take: Number(pageLimit),
        skip: Number(defaultPage * pageLimit),
        where: { city, dateOfBirth, firstName, lastName },
      });

      if (!result) return res.status(404).send("Users not found");

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  async loginUser(
    // Will check user and return a token

    req: Request<{}, {}, { email: string; password: string }, {}>,
    res: Response
  ) {
    try {
      const { email, password } = req.body;

      // Check if user with email exists
      const user = await this.userRepo.findOne({ where: { email } });

      // If user is not found
      if (!user) return res.status(404).send("User with email does not exist");

      // Check if password is valid
      const isValidPassword = await bcrypt.compare(password, user.password);

      // If it is not valid
      if (!isValidPassword)
        return res.status(401).send("Incorrect login details");

      // Else if valid
      const token = signPayload(_.pick(user, ["id", "isAdmin", "isAgent"]));

      // Return a token of the user
      return res.status(200).send(token);
    } catch (error) {
      res.status(500).send("Server error");
    }
  }

  async removeUser(req: Request<{ id: number }, {}, {}, {}>, res: Response) {
    // Finds the user return and error if user is not found
    // Deletes the user and returns the id of the user if user is found

    try {
      const user = await this.userRepo.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!user) return res.status(404).send("User not found");

      await this.userRepo.delete({ id: Number(req.params.id) });

      res.status(200).send("Deleted successfully");
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }

  async updateUser(req: Request<{ id: number }, {}, IUser, {}>, res: Response) {
    // Checks if user with id exist
    // Update the details of the user with the new new parameters

    try {
      const user = await this.userRepo.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!user) return res.status(404).send("User not found");

      const updatedUser = await makeUser({
        id: Number(req.params.id),
        ...req.body,
      });

      await this.userRepo.save(updatedUser);

      return res.status(200).send("Update sucessfully");
    } catch (error) {}
  }
}

export default new UserService();
