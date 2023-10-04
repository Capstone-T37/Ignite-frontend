import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SnackBarStoreModel } from "./SnackBarStore"
import { MeetStoreModel } from "./MeetStore"
import { ActivityStoreModel } from "./ActivityStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  snackBarStore: types.optional(SnackBarStoreModel, {} as any),
  meetStore: types.optional(MeetStoreModel, {} as any),
  activityStore: types.optional(ActivityStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
