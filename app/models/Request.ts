import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const RequestModel = types
  .model("Request")
  .props({
    id: types.number,
    userName: "",
    imageUrl: types.maybeNull(types.string)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Request extends Instance<typeof RequestModel> { }
export interface RequestSnapshotOut extends SnapshotOut<typeof RequestModel> { }
export interface RequestSnapshotIn extends SnapshotIn<typeof RequestModel> { }
export const createRequestDefaultModel = () => types.optional(RequestModel, {})
