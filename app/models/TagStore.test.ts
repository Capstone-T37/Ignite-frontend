import { TagStoreModel } from "./TagStore"

test("can be created", () => {
  const instance = TagStoreModel.create({})

  expect(instance).toBeTruthy()
})
