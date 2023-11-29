import { TagModel } from "./Tag"

test("can be created", () => {
  const instance = TagModel.create({})

  expect(instance).toBeTruthy()
})
