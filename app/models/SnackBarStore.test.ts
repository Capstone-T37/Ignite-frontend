import { SnackBarStoreModel } from "./SnackBarStore"

import { getSnapshot, applySnapshot } from "mobx-state-tree";


describe("SnackBarStoreModel", () => {
  it("should create an instance of the model with specific values using create", () => {
    const snackBarStore = SnackBarStoreModel.create({
      createActivity: false,
      createMeet: true,
    });

    expect(snackBarStore.createActivity).toBe(false);
    expect(snackBarStore.createMeet).toBe(true);
  });

  it("should set properties using setProp action", () => {
    const snackBarStore = SnackBarStoreModel.create({
      createActivity: false,
      createMeet: true,
    });

    snackBarStore.setProp("createActivity", true);

    expect(snackBarStore.createActivity).toBe(true);
    expect(snackBarStore.createMeet).toBe(true); // createMeet should remain unchanged in this example
  });

  it("should create a snapshot of the model", () => {
    const snackBarStore = SnackBarStoreModel.create({
      createActivity: false,
      createMeet: true,
    });

    const snapshot = getSnapshot(snackBarStore);

    expect(snapshot).toEqual({
      createActivity: false,
      createMeet: true,
    });
  });

  it("should apply a snapshot to update the model", () => {
    const snackBarStore = SnackBarStoreModel.create({
      createActivity: false,
      createMeet: true,
    });

    const snapshot = {
      createActivity: true,
      createMeet: false,
    };

    applySnapshot(snackBarStore, snapshot);

    expect(snackBarStore.createActivity).toBe(true);
    expect(snackBarStore.createMeet).toBe(false);
  });
});
