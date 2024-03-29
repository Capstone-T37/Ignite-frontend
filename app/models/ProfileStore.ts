import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ProfileModel } from "./Profile"

/**
 * Model description here for TypeScript hints.
 */
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    meetEnabled: false,
    profile: types.maybe(ProfileModel)
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get isMeetEnabled() {
      return store.meetEnabled
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchStatus() {
      const response = await api.getIsEnabledMeet()
      if (response.kind === "ok") {
        store.setProp("meetEnabled", response.meetEnabled)
      } else {
        console.tron.error(`Error fetching meets: ${JSON.stringify(response)}`, [])
      }
    },
    async disableStatus() {
      const response = await api.disableMeet()
      if (response.kind === "ok") {
        store.setProp("meetEnabled", false)
      } else {
        console.tron.error(`Error disabling meet: ${JSON.stringify(response)}`, [])
      }
    },
    async fetchProfile() {
      const response = await api.fetchProfile()
      if (response.kind === "ok") {
        store.setProp("profile", response.profile)
      } else {
        console.tron.error(`Error fetching meets: ${JSON.stringify(response)}`, [])
      }
    },
    async updateProfilePic(imageUrl: string) {
      const response = await api.updateProfilePic({ imageUrl })
      if (response.kind === "ok") {
        store.setProp("profile", { ...store.profile, imageUrl })
      } else {
        console.tron.error(`Error updating profile pic: ${JSON.stringify(response)}`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ProfileStore extends Instance<typeof ProfileStoreModel> { }
export interface ProfileStoreSnapshotOut extends SnapshotOut<typeof ProfileStoreModel> { }
export interface ProfileStoreSnapshotIn extends SnapshotIn<typeof ProfileStoreModel> { }
export const createProfileStoreDefaultModel = () => types.optional(ProfileStoreModel, {})
