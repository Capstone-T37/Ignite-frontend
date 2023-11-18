import React from 'react';
import renderer from 'react-test-renderer';
import { Api } from './api'; // Adjust with actual path and class name
import { UserCred } from '../../models/AuthenticationStore'



describe('isAuthenticated method', () => {
  let service: Api;

  let Testcreds : UserCred = {
    username: 'admin',
    password: 'admin',
    rememberMe: false
  }
  
  beforeAll(async () => {
      service = new Api();
  });

  it('should return false if user is not authenticated', async () => {

    const result = await service.isAuthenticated();
    expect(result.kind).toEqual("unauthorized");
    
  });

  it('should return { kind: "ok" } for a successful authentication', async () => {

    const result = await service.authenticate(Testcreds);
    expect(result.kind).toEqual("ok");

  });

  it('should return true after a successful authentication', async () => {

    const result = await service.isAuthenticated();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await service.getActivities();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await service.getIsEnabledMeet();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await service.getMeets();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await service.getRequestCount();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await service.getRequests();
    expect(result.kind).toBeTruthy();

  });

  it('should return { kind: "ok" } after a successful authentication', async () => {

    const result = await service.getUsers();
    expect(result.kind).toBeTruthy();

  });

});


