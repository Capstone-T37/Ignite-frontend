import { RequestStoreModel } from "./RequestStore"

test("can be created", () => {
  const instance = RequestStoreModel.create({})

  expect(instance).toBeTruthy()
})
