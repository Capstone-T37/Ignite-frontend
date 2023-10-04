import { SnackBarStoreModel } from "./SnackBarStore"

test("can be created", () => {
  const instance = SnackBarStoreModel.create({})

  expect(instance).toBeTruthy()
})
