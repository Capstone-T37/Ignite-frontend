import { api } from "app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import jwt_decode, {JwtPayload} from "jwt-decode";



export const JwtTokenModel = types
  .model("JwtToken")
  .props({
    id_token: "",
  })
  .actions((store) => ({
    setToken(value: string) {
      store.id_token = value
    }
  }))
  .views((store) => ({
    get getToken() {
      return store.id_token
    }
  }))
export interface JwtToken extends Instance<typeof JwtTokenModel> { }
export interface JwtTokenSnapshotOut extends SnapshotOut<typeof JwtTokenModel> { }
export interface JwtTokenSnapshotIn extends SnapshotIn<typeof JwtTokenModel> { }

export interface UserCred {
  username: string,
  password: string,
  rememberMe: boolean
}
/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybe(JwtTokenModel),
    userName: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      if(!!store.authToken == false){
        return false
      }  
      const decodedToken = jwt_decode<JwtPayload>(store.authToken.getToken)
      if(decodedToken.exp * 1000 < new Date().getTime())return false
      return true
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    async setAuthToken(userCred: UserCred) {
      const response = await api.authenticate(userCred)
      if (response.kind === "ok") {
        store.setProp("authToken", response.jwtToken)
        console.info(response.jwtToken)
      } else {
        console.tron.error(`Error fetching jwtToken: ${JSON.stringify(response)}`, [])
      }
    },
    setUserName(value: string) {
      store.userName = value
    },
    logout() {
      store.authToken = undefined
      store.userName = ""
    },
  }))



export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshotOut extends SnapshotOut<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshotIn extends SnapshotIn<typeof AuthenticationStoreModel> { }
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
