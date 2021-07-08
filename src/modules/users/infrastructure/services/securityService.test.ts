import { SecurityServiceImpl } from "./securityService";

const bcrypt = {
  hash: jest.fn(),
  compare: jest.fn(),
};

const securityServiceImpl = new SecurityServiceImpl(bcrypt);

describe("Security service service test", () => {
  it("Should call the hash function on the external bcrypt package injected with the right props when hash is called", () => {
    securityServiceImpl.hash("plainText");

    expect(bcrypt.hash).toBeCalledWith("plainText", 10);
  });
  it("Should call the compare function on the external bcrypt package injected with the right props when compare is called", () => {
    securityServiceImpl.compare("plainText", "hash");

    expect(bcrypt.compare).toBeCalledWith("plainText", "hash");
  });
});
