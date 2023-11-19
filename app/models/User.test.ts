import { UserModel } from "./User"

import { getSnapshot, applySnapshot } from "mobx-state-tree";


describe("UserModel", () => {
  it("should create an instance of the model with specific values using create", () => {
    const user = UserModel.create({
      id: 1,
      login: "john_doe",
    });

    expect(user.id).toBe(1);
    expect(user.login).toBe("john_doe");
  });

  it("should set properties using setProp action", () => {
    const user = UserModel.create({
      id: 2,
      login: "jane_doe",
    });

    user.setProp("id", 3);

    expect(user.id).toBe(3);
    expect(user.login).toBe("jane_doe");
  });

  it("should create a snapshot of the model", () => {
    const user = UserModel.create({
      id: 4,
      login: "alice_doe",
    });

    const snapshot = getSnapshot(user);

    expect(snapshot).toEqual({
      id: 4,
      login: "alice_doe",
    });
  });

  it("should apply a snapshot to update the model", () => {
    const user = UserModel.create({
      id: 5,
      login: "bob_doe",
    });

    const snapshot = {
      id: 6,
      login: "charlie_doe",
    };

    applySnapshot(user, snapshot);

    expect(user.id).toBe(6);
    expect(user.login).toBe("charlie_doe");
  });
});

