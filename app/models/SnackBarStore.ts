import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SnackBarStoreModel = types
  .model("SnackBarStore")
  .props({
    createActivity: false,
    createMeet: false
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SnackBarStore extends Instance<typeof SnackBarStoreModel> { }
export interface SnackBarStoreSnapshotOut extends SnapshotOut<typeof SnackBarStoreModel> { }
export interface SnackBarStoreSnapshotIn extends SnapshotIn<typeof SnackBarStoreModel> { }
export const createSnackBarStoreDefaultModel = () => types.optional(SnackBarStoreModel, {})
