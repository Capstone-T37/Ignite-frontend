import { RequestModel } from "./Request"

import { getSnapshot, applySnapshot } from "mobx-state-tree";

describe("RequestModel", () => {
  it("should create an instance of the model with specific values using create", () => {
    const request = RequestModel.create({
      id: 123,
      userName: "JohnDoe",
    });

    expect(request.id).toBe(123);
    expect(request.userName).toBe("JohnDoe");
  });

  it("should set properties using setProp action", () => {
    const request = RequestModel.create({
      id: 456,
      userName: "JaneDoe",
    });


    request.setProp("id", 1);

    expect(request.id).toBe(1);
    expect(request.userName).toBe("JaneDoe"); // userName should remain unchanged in this example
  });

  it("should create a snapshot of the model", () => {
    const request = RequestModel.create({
      id: 789,
      userName: "Alice",
    });

    const snapshot = getSnapshot(request);

    expect(snapshot).toEqual({
      id: 789,
      userName: "Alice",
    });
  });

  it("should apply a snapshot to update the model", () => {
    const request = RequestModel.create({
      id: 42,
      userName: "Bob",
    });

    const snapshot = {
      id: 99,
      userName: "Charlie",
    };

    applySnapshot(request, snapshot);

    expect(request.id).toBe(99);
    expect(request.userName).toBe("Charlie");
  });
});
