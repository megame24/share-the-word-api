import { mockBcrypt } from "../../testUtils";
import { SecurityServiceImpl } from "./securityService";

const securityServiceImpl = new SecurityServiceImpl(mockBcrypt);

describe("Security service service test", () => {
  it("Should call the hash function on the external mockBcrypt package injected with the right props when hash is called", () => {
    securityServiceImpl.hash("plainText");

    expect(mockBcrypt.hash).toBeCalledWith("plainText", 10);
  });
  it("Should call the compare function on the external mockBcrypt package injected with the right props when compare is called", () => {
    securityServiceImpl.compare("plainText", "hash");

    expect(mockBcrypt.compare).toBeCalledWith("plainText", "hash");
  });
});
