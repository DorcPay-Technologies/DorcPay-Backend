import { signPayload } from "../sign-payload";

describe("signPayload", () => {
  it("should return a token when called with a payload", () => {
    const payload = {
      id: 1,
      isAdmin: true,
    };

    const token = signPayload(payload);

    expect(token).toBeDefined();
  });
});
