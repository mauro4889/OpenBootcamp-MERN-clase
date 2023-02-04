import { BasicResponse } from "../types";
import {IUser} from '../../domain/interfaces/IUser.interface'

export interface IHelloController {
    getMessage(name: string): Promise<BasicResponse>
}

export interface IUserController {
    // Read all users from database || get User By ID
    getUsers(id?: string): Promise<any>
    //Delete user by ID
    deleteUser(id?: string): Promise<any>
    //Create new User
    createUser(user: any): Promise<any>
    //Update User
    updateUser(id:string, user:any): Promise<any>
}

export interface IAuthController{
    // Register users
    registerUser(user: IUser): Promise<any>
    // Login user
    loginUser(auth: any): Promise<any>
}