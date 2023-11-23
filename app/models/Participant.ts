import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ParticipantModel = types
  .model("Participant")
  .props({
    id: types.number,
    userName: "",
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Participant extends Instance<typeof ParticipantModel> {}
export interface ParticipantSnapshotOut extends SnapshotOut<typeof ParticipantModel> {}
export interface ParticipantSnapshotIn extends SnapshotIn<typeof ParticipantModel> {}
export const createParticipantDefaultModel = () => types.optional(ParticipantModel, {})
