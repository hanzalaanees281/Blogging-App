import confi from "../confi/confi.js"
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
           .setEndpoint(confi.appwriteUrl)
           .setProject(confi.appwriteProjectId);
           this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}) {
        try {
           const userCreate = await this.account.create(ID.unique(), email, password, name);
           if (userCreate) {
            return this.login({email, password})
           }
           else {
            return userCreate;
           }
        } catch (error) {
            throw error; 
        }
    }

    async login ({email, password}) {
        try {
           return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }

    }

    async getUserAccount () {
        try {
          return await this.account.get()
        } catch (error) {
            console.log("Appwrite serive :: getUserAccount :: error", error);
        }
        return null;
    }

    async logout () {
        try {
           return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService;