import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { RequestModel } from "./Request"

/**
 * Model description here for TypeScript hints.
 */

export const RequestStoreModel = types
  .model("RequestStore")
  .props({
    requests: types.array(RequestModel),
    requestCount: types.maybeNull(types.number)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchRequests() {
      const response = await api.getRequests()
      if (response.kind === "ok") {
        store.setProp("requests", response.requests)
      } else {
        console.tron.error(`Error fetching requests: ${JSON.stringify(response)}`, [])
      }
    },
    async fetchRequestCount() {
      const response = await api.getRequestCount()
      if (response.kind === "ok") {
        store.setProp("requestCount", response.count)
      } else {
        console.tron.error(`Error fetching requests count: ${JSON.stringify(response)}`, [])
      }
    }

  }))

export interface RequestStore extends Instance<typeof RequestStoreModel> { }
export interface RequestStoreSnapshotOut extends SnapshotOut<typeof RequestStoreModel> { }
export interface RequestStoreSnapshotIn extends SnapshotIn<typeof RequestStoreModel> { }
export const createRequestStoreDefaultModel = () => types.optional(RequestStoreModel, {})
