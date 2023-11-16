import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { UserModel } from "./User"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.array(UserModel)
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get activitiesForList() {
      return store.users
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchUsers() {
      const response = await api.getUsers()
      if (response.kind === "ok") {
        store.setProp("users", response.users)
      } else {
        console.tron.error(`Error fetching users: ${JSON.stringify(response)}`, [])
      }
    }
  }))


export interface UserStore extends Instance<typeof UserStoreModel> { }
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> { }
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> { }
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
