import { UUIDServiceImpl } from "./uuidService";

describe("UUID service test", () => {
  it("Should call the external uuid package injected when generate is called", () => {
    const uuidv4 = jest.fn();

    new UUIDServiceImpl(uuidv4).generate();

    expect(uuidv4).toHaveBeenCalled();
  });
});
