import { MeetModel } from "./Meet"

import { getSnapshot, applySnapshot } from "mobx-state-tree";


describe("MeetModel", () => {
  it("should create an instance of the model with specific values using create", () => {
    const meet = MeetModel.create({
      id: 1,
      userName: "JohnDoe",
      description: "Meeting Description",
      isRequestSent: false,
    });

    expect(meet.id).toBe(1);
    expect(meet.userName).toBe("JohnDoe");
    expect(meet.description).toBe("Meeting Description");
    expect(meet.isRequestSent).toBe(false);
  });

  it("should set properties using setProp action", () => {
    const meet = MeetModel.create({
      id: 2,
      userName: "JaneDoe",
      description: "Another Meeting Description",
      isRequestSent: true,
    });

    meet.setProp("id", 3);

    expect(meet.id).toBe(3);
    expect(meet.userName).toBe("JaneDoe");
    expect(meet.description).toBe("Another Meeting Description");
    expect(meet.isRequestSent).toBe(true);
  });

  it("should create a snapshot of the model", () => {
    const meet = MeetModel.create({
      id: 4,
      userName: "Alice",
      description: "Yet Another Meeting Description",
      isRequestSent: false,
    });

    const snapshot = getSnapshot(meet);

    expect(snapshot).toEqual({
      id: 4,
      userName: "Alice",
      description: "Yet Another Meeting Description",
      isRequestSent: false,
    });
  });

  it("should apply a snapshot to update the model", () => {
    const meet = MeetModel.create({
      id: 5,
      userName: "Bob",
      description: "One More Meeting Description",
      isRequestSent: true,
    });

    const snapshot = {
      id: 6,
      userName: "Charlie",
      description: "Updated Meeting Description",
      isRequestSent: false,
    };

    applySnapshot(meet, snapshot);

    expect(meet.id).toBe(6);
    expect(meet.userName).toBe("Charlie");
    expect(meet.description).toBe("Updated Meeting Description");
    expect(meet.isRequestSent).toBe(false);
  });
});

