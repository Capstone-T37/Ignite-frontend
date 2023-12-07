import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { ActivityModel } from "./Activity"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { TagStoreSnapshotIn } from "./TagStore"

/**
 * Model description here for TypeScript hints.
 */
export const ActivityStoreModel = types
  .model("ActivityStore")
  .props({
    activities: types.array(ActivityModel),
    ownActivities: types.array(ActivityModel)

  })
  .actions(withSetPropAction)
  .views((store) => ({
    get activitiesForList() {
      return store.activities
    },
  }))
  .actions((store) => ({
    async fetchActivities(tags?: TagStoreSnapshotIn[]) {
      const response = await api.getActivities(tags)
      if (response.kind === "ok") {
        store.setProp("activities", response.activities)
      } else {
        console.tron.error(`Error fetching activities: ${JSON.stringify(response)}`, [])
      }
    },
    async fetchOwnActivities() {
      const response = await api.getOwnActivities()
      if (response.kind === "ok") {
        store.setProp("ownActivities", response.activities)
      } else {
        console.tron.error(`Error fetching own activities: ${JSON.stringify(response)}`, [])
      }
    },
  }))

export interface ActivityStore extends Instance<typeof ActivityStoreModel> { }
export interface ActivityStoreSnapshotOut extends SnapshotOut<typeof ActivityStoreModel> { }
export interface ActivityStoreSnapshotIn extends SnapshotIn<typeof ActivityStoreModel> { }
export const createActivityStoreDefaultModel = () => types.optional(ActivityStoreModel, {})
