import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ActivityDetailsModel = types
  .model("ActivityDetails")
  .props({
    id: types.number,
    userName: "",
    title: "",
    description: "",
    date: "",
    isParticipating: types.boolean,
    tags: types.array(types.string),
    participants: types.array(types.string),
    imageUrl: ""
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ActivityDetails extends Instance<typeof ActivityDetailsModel> { }
export interface ActivityDetailsSnapshotOut extends SnapshotOut<typeof ActivityDetailsModel> { }
export interface ActivityDetailsSnapshotIn extends SnapshotIn<typeof ActivityDetailsModel> { }
export const createActivityDetailsDefaultModel = () => types.optional(ActivityDetailsModel, {})
