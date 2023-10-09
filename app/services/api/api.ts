/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse,
  ApisauceInstance,
  create,
} from "apisauce"
import { ActivitySnapshotIn, JwtTokenSnapshotIn, MeetSnapshotIn, UserCred } from "app/models"
import Config from "../../config"
import type {
  ActivityItem,
  ApiConfig, CreateActivity, JwtResponse, MeetItem,
} from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Authenticate with credentials
   */
  async authenticate(body: UserCred): Promise<{ kind: "ok"; jwtToken: JwtTokenSnapshotIn } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<JwtResponse> = await this.apisauce.post(`authenticate`, body)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      this.apisauce.setHeader('Authorization', `Bearer ${rawData.id_token}`)
      return { kind: "ok", jwtToken: rawData }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Get list of activities
   */
   async getActivities(): Promise<{ kind: "ok"; activities: ActivitySnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ActivityItem[]> = await this.apisauce.get(`activities`,)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const activities: ActivitySnapshotIn[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", activities }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Get list of Meets
   */
  async getMeets(): Promise<{ kind: "ok"; meets: MeetSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<MeetItem[]> = await this.apisauce.get(`meets/exclude-user-meets`,)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const meets: MeetSnapshotIn[] = rawData.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", meets }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Post an activity
   */
  async postActivity(body: CreateActivity): Promise<{ kind: "ok" } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ResponseType> = await this.apisauce.post(`activities`, body)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok" }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

}

// Singleton instance of the API for convenience
export const api = new Api()
