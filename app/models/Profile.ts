import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ProfileModel = types
  .model("Profile")
  .props({
    fullName: "",
    imageUrl: "",
    userName: ""
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Profile extends Instance<typeof ProfileModel> { }
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileModel> { }
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileModel> { }
export const createProfileDefaultModel = () => types.optional(ProfileModel, {})
