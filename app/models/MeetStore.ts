import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MeetModel } from "./Meet"

/**
 * Model description here for TypeScript hints.
 */
export const MeetStoreModel = types
  .model("MeetStore")
  .props({
    meets: types.array(MeetModel)
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get meetsForList() {
      return store.meets
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchMeets() {
      const response = await api.getMeets()
      if (response.kind === "ok") {
        store.setProp("meets", response.meets)
      } else {
        console.tron.error(`Error fetching meets: ${JSON.stringify(response)}`, [])
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface MeetStore extends Instance<typeof MeetStoreModel> { }
export interface MeetStoreSnapshotOut extends SnapshotOut<typeof MeetStoreModel> { }
export interface MeetStoreSnapshotIn extends SnapshotIn<typeof MeetStoreModel> { }
export const createMeetStoreDefaultModel = () => types.optional(MeetStoreModel, {})
