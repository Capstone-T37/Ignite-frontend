import { TagSnapshotIn } from "app/models"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface JwtResponse {
  id_token: string
}
export interface ActivityItem {
  id: number,
  firstName: string,
  title: string,
  description: string,
  address: string,
  date: string,
  maximum: number,
}
export interface CreateActivity {
  title: string,
  description: string,
  address: string,
  date: Date,
  maximum: number,
}

export interface CreateActivityWithTags extends CreateActivity {
  tags: TagSnapshotIn[]
}
export interface CreateMeet {
  description: string
}
export interface CreateRequest {
  meetId: number
}
export interface CreateUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  login: string,
  imageUrl: string

}
export interface JoinActivity {
  activityId: number
}

export interface UpdateProfilePic {
  imageUrl: string
}


/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
