import { ActivityDetailsModel } from "./ActivityDetails"

test("can be created", () => {
  const instance = ActivityDetailsModel.create({})

  expect(instance).toBeTruthy()
})
