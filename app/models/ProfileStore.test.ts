import { ProfileStoreModel } from "./ProfileStore"

test("can be created", () => {
  const instance = ProfileStoreModel.create({})

  expect(instance).toBeTruthy()
})
