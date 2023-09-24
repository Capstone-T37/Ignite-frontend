import { MeetStoreModel } from "./MeetStore"

test("can be created", () => {
  const instance = MeetStoreModel.create({})

  expect(instance).toBeTruthy()
})
