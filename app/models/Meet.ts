import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const MeetModel = types
  .model("Meet")
  .props({
    id: types.number,
    userName: "",
    description: "",
    isRequestSent: types.boolean,
    imageUrl: types.maybeNull(types.string)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Meet extends Instance<typeof MeetModel> { }
export interface MeetSnapshotOut extends SnapshotOut<typeof MeetModel> { }
export interface MeetSnapshotIn extends SnapshotIn<typeof MeetModel> { }
export const createMeetDefaultModel = () => types.optional(MeetModel, {})
