import { MeetModel } from "./Meet"

test("can be created", () => {
  const instance = MeetModel.create({})

  expect(instance).toBeTruthy()
})
