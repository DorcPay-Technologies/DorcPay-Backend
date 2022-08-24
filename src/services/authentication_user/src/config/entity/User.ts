import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { IUser } from "../../models/user";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn("uuid")
  customerId: string;

  @Column({})
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: number;

  @Column()
  street1: string;

  @Column({ default: "" })
  street2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  //To add default picture avatar
  @Column()
  picture: string;

  @Column()
  verificationId: string;

  @Column({ unique: true })
  verificationNumber: number;

  @Column()
  occupation: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isAgent: boolean;
}
