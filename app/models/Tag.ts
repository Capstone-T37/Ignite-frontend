import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const TagModel = types
  .model("Tag")
  .props({
    id: types.number,
    title: ""
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Tag extends Instance<typeof TagModel> { }
export interface TagSnapshotOut extends SnapshotOut<typeof TagModel> { }
export interface TagSnapshotIn extends SnapshotIn<typeof TagModel> { }
export const createTagDefaultModel = () => types.optional(TagModel, {})
