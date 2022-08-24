interface UserQuery {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  dateOfBirth: Date;
  page: number;
  limit: number;
}

export default UserQuery;
