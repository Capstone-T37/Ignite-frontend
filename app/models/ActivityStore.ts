import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ActivityModel } from "./Activity"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ActivityStoreModel = types
  .model("ActivityStore")
  .props({
    activities: types.array(ActivityModel)
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get activitiesForList() {
      return store.activities
    },
  }))
  .actions((store) => ({
    async fetchActivities() {
      const response = await api.getActivities()
      if (response.kind === "ok") {
        store.setProp("activities", response.activities)
      } else {
        console.tron.error(`Error fetching activities: ${JSON.stringify(response)}`, [])
      }
    }
  }))

export interface ActivityStore extends Instance<typeof ActivityStoreModel> { }
export interface ActivityStoreSnapshotOut extends SnapshotOut<typeof ActivityStoreModel> { }
export interface ActivityStoreSnapshotIn extends SnapshotIn<typeof ActivityStoreModel> { }
export const createActivityStoreDefaultModel = () => types.optional(ActivityStoreModel, {})