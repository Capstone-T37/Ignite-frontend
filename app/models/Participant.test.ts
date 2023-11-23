import { ParticipantModel } from "./Participant"

test("can be created", () => {
  const instance = ParticipantModel.create({})

  expect(instance).toBeTruthy()
})
