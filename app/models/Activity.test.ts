import { ActivityModel } from "./Activity"

import { getSnapshot, applySnapshot } from "mobx-state-tree";

describe("ActivityModel", () => {
  it("should create an instance of the model with specific values using create", () => {
    const activity = ActivityModel.create({
      id: 1,
      firstName: "John",
      title: "Event Title",
      description: "Event Description",
      address: "Event Address",
      date: "2023-12-01",
      maximum: 50,
    });

    expect(activity.id).toBe(1);
    expect(activity.firstName).toBe("John");
    expect(activity.title).toBe("Event Title");
    expect(activity.description).toBe("Event Description");
    expect(activity.address).toBe("Event Address");
    expect(activity.date).toBe("2023-12-01");
    expect(activity.maximum).toBe(50);
  });

  it("should set properties using setProp action", () => {
    const activity = ActivityModel.create({
      id: 2,
      firstName: "Jane",
      title: "Another Event",
      description: "Another Description",
      address: "Another Address",
      date: "2023-12-02",
      maximum: 100,
    });

    activity.setProp("id", 3);

    expect(activity.id).toBe(3);
    expect(activity.firstName).toBe("Jane");
    expect(activity.title).toBe("Another Event");
    expect(activity.description).toBe("Another Description");
    expect(activity.address).toBe("Another Address");
    expect(activity.date).toBe("2023-12-02");
    expect(activity.maximum).toBe(100);
  });

  it("should create a snapshot of the model", () => {
    const activity = ActivityModel.create({
      id: 4,
      firstName: "Alice",
      title: "Yet Another Event",
      description: "Yet Another Description",
      address: "Yet Another Address",
      date: "2023-12-03",
      maximum: 75,
    });

    const snapshot = getSnapshot(activity);

    expect(snapshot).toEqual({
      id: 4,
      firstName: "Alice",
      title: "Yet Another Event",
      description: "Yet Another Description",
      address: "Yet Another Address",
      date: "2023-12-03",
      maximum: 75,
    });
  });

  it("should apply a snapshot to update the model", () => {
    const activity = ActivityModel.create({
      id: 5,
      firstName: "Bob",
      title: "One More Event",
      description: "One More Description",
      address: "One More Address",
      date: "2023-12-04",
      maximum: 120,
    });

    const snapshot = {
      id: 6,
      firstName: "Charlie",
      title: "Updated Event",
      description: "Updated Description",
      address: "Updated Address",
      date: "2023-12-05",
      maximum: 90,
    };

    applySnapshot(activity, snapshot);

    expect(activity.id).toBe(6);
    expect(activity.firstName).toBe("Charlie");
    expect(activity.title).toBe("Updated Event");
    expect(activity.description).toBe("Updated Description");
    expect(activity.address).toBe("Updated Address");
    expect(activity.date).toBe("2023-12-05");
    expect(activity.maximum).toBe(90);
  });
});
