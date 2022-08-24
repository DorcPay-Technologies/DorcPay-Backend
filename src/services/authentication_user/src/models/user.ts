export interface IUser {
  id: number;

  customerId: string;

  firstName: string;

  lastName: string;

  dateOfBirth: Date;

  email: string;

  password: string;

  phone: number;

  street1: string;

  street2: string;

  city: string;

  state: string;

  country: string;

  picture: string;

  verificationId: string;

  verificationNumber: number;

  occupation: string;

  isAdmin: boolean;

  isAgent: boolean;
}
