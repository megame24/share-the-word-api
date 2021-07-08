import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { SecurityServiceImpl } from "./securityService";
import { UUIDServiceImpl } from "./uuidService";

export const securityServiceImpl = new SecurityServiceImpl(bcrypt);
export const uuidServiceImpl = new UUIDServiceImpl(uuidv4);
