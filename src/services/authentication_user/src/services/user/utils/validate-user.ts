import Joi from "joi";
import { IUser } from "../../../models/user";

const schema: Joi.PartialSchemaMap<IUser> = {
  dateOfBirth: Joi.date().iso().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .min(6),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.number().required(),
  street1: Joi.string().required(),
  street2: Joi.string(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  occupation: Joi.string(),
  picture: Joi.string(),
  verificationId: Joi.string().required(),
  verificationNumber: Joi.number().required(),
  isAdmin: Joi.boolean(),
  isAgent: Joi.boolean(),
};

//Create user schema from defined schema
const userSchema = Joi.object(schema);

// Export validate functioon
export default (user: IUser) => userSchema.validate(user);
