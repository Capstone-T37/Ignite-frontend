import { AuthenticationStoreModel } from "./AuthenticationStore"

test("can be created", () => {
  const instance = AuthenticationStoreModel.create({})

  expect(instance).toBeTruthy()
})
