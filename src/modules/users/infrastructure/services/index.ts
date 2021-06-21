import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { SecurityServiceImplementation } from "./securityService";
import { UUIDServiceImplementation } from "./uuidService";

const securityServiceImplementation = new SecurityServiceImplementation(bcrypt);
const uuidServiceImplementation = new UUIDServiceImplementation(uuidv4);

export default {
  securityServiceImplementation,
  uuidServiceImplementation,
};
