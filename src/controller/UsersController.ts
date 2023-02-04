import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";
import { createUser, deleteUserByID, getAllUsers, getUserByID, updateUserByID } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")

export class UserController implements IUserController {

    @Post('/')
    async createUser(user: any): Promise<any> {

        let response: any = ''

        await createUser(user).then((r) => {
            LogSuccess(`[/api/users] Create User: ${user}`)
            response = {
                message: `User created succesfully: ${user.name}`
            }
        })

        return response
    }
    /**
     * Endpoint to retrive the Users in the Collection "Users" of DB
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by ID
     */
    @Get('/')
    async getUsers(@Query()id?: string): Promise<any> {

        let response: any = ''

        if(id){
            LogSuccess(`Obtaining User By ID ${id}`)
            response = await getUserByID(id)
        } else {
            LogSuccess('[/api/users] Get All Users Request')
            response = await getAllUsers()
        }

        return response
    }
    /**
     * Endpoint to retrive the Users in the Collection "Users" of DB
     * @param {string} id Id of user to delete (optional)
     * @returns message informing if deletion was correct
     */    
    @Delete('/')
    async deleteUser(@Query()id?: string): Promise<any> {

        let response: any = ''

        if(id){
            LogSuccess(`[/api/users] Delete User By ID ${id}`)
            deleteUserByID(id).then((r) => {
                response = {
                    status: 204,
                    message: `User with id ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Delete User Request WITHOUT ID')
            response = {
                status: 400,
                message: 'Please, provide an ID to remove from database'
            }
        }

        return response
    }
    
    @Put('/')
    async updateUser(@Query()id: string, user: any): Promise<any> {
        let response: any = ''

        if(id){
            LogSuccess(`[/api/users] Update User By ID ${id}`)
            await updateUserByID(id, user).then((r) => {
                response = {
                    status: 204,
                    message: `User with id ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Update User Request WITHOUT ID')
            response = {
                status: 400,
                message: 'Please, provide an ID to update from database'
            }
        }

        return response
    }
}