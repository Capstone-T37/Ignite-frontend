import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { TagStoreModel } from "./TagStore"
import { RequestStoreModel } from "./RequestStore"
import { UserStoreModel } from "./UserStore"
import { ProfileStoreModel } from "./ProfileStore"
import { MeetStoreModel } from "./MeetStore"
import { ActivityStoreModel } from "./ActivityStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  tagStore: types.optional(TagStoreModel, {} as any),
  requestStore: types.optional(RequestStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  profileStore: types.optional(ProfileStoreModel, {} as any),
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
