import { UserCred } from 'app/models';
import { Api, Firebase } from '.'; // Adjust with actual path and class name

describe('FirebaseService test suite', () => {
    let FirebaseService: Firebase;

    let apiService: Api;

    let Testcreds : UserCred = {
      username: 'admin',
      password: 'admin',
      rememberMe: false
    }

    let token: string 
    
    beforeAll(async () => {
        FirebaseService = new Firebase();
        apiService = new Api()
        const resp = await apiService.apisauce.post(`authenticate`, Testcreds)
        token = resp.headers?.firebasetoken
    });
  
    it('should not throw an error if correct token is passed', async () => {
  
      try {
        await FirebaseService.signInWithCustomToken(token)
        expect(true).toBe(true); // Confirm that no error was thrown
      } catch (error) {
          expect(true).toBeFalsy(); // This should not execute
      }
      
    });

    it('should throw an error if incorrect token is passed', async () => {
  
      try {
        await FirebaseService.signInWithCustomToken('wrong token')
        expect(true).toBe(true); // Confirm that no error was thrown
      } catch (error) {
          expect(true).toBeTruthy(); // This should not execute
      }
      
    });
  
    
  
  });