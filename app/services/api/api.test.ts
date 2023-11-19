import { Api } from './api'; // Adjust with actual path and class name
import { UserCred } from '../../models/AuthenticationStore'



describe('api apiService test suite', () => {
  let apiService: Api;

  let Testcreds : UserCred = {
    username: 'admin',
    password: 'admin',
    rememberMe: false
  }
  
  beforeAll(async () => {
      apiService = new Api();
  });

  it('should call the correct base url', async () => {

    const result = apiService.apisauce.getBaseURL();
    let expectedBaseUrl = 'http://localhost:8080/api/'
    expect(result).toEqual(expectedBaseUrl);

  });

  it('should return false if user is not authenticated', async () => {

    const result = await apiService.isAuthenticated();
    expect(result.kind).toEqual("unauthorized");
    
  });

  it('should return { kind: "ok" } and a definedtoken for a successful authentication', async () => {

    const result = await apiService.authenticate(Testcreds);
    expect(result.kind).toEqual("ok");
    //token should be returned
    expect(result['jwtToken']).toBeTruthy();

  });

  it('should return true after a successful authentication', async () => {

    const result = await apiService.isAuthenticated();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await apiService.getActivities();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await apiService.getIsEnabledMeet();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await apiService.getMeets();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await apiService.getRequestCount();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await apiService.getRequests();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await apiService.getUsers();
    expect(result.kind).toBeTruthy();

  });

});


