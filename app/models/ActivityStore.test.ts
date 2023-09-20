import { ActivityStoreModel } from "./ActivityStore"

test("can be created", () => {
  const instance = ActivityStoreModel.create({})

  expect(instance).toBeTruthy()
})
