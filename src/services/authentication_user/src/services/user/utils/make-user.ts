import { IUser } from "../../../models/user";
import bcrypt from "bcrypt";

const makeUser = async (user: IUser) => {
  //Set the date of birth of user
  const userDOB = new Date(user.dateOfBirth);

  // Hash the password before storing it
  const userPass = await hashPassword(user.password);

  const { password, dateOfBirth, ...userProps } = user;

  return Object.freeze<IUser>({
    dateOfBirth: userDOB,
    password: userPass,
    ...userProps,
  });
};

//Function for hashing password
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  return await bcrypt.hash(password, salt);
};

export default makeUser;
