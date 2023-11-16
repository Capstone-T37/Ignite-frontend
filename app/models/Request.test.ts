import { RequestModel } from "./Request"

test("can be created", () => {
  const instance = RequestModel.create({})

  expect(instance).toBeTruthy()
})
