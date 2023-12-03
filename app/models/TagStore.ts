import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { TagModel } from "./Tag"
import { api } from "app/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const TagStoreModel = types
  .model("TagStore")
  .props({
    tags: types.array(TagModel)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchTags() {
      const response = await api.getTags()
      if (response.kind === "ok") {
        store.setProp("tags", response.tags)
      } else {
        console.tron.error(`Error fetching requests: ${JSON.stringify(response)}`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TagStore extends Instance<typeof TagStoreModel> { }
export interface TagStoreSnapshotOut extends SnapshotOut<typeof TagStoreModel> { }
export interface TagStoreSnapshotIn extends SnapshotIn<typeof TagStoreModel> { }
export const createTagStoreDefaultModel = () => types.optional(TagStoreModel, {})
