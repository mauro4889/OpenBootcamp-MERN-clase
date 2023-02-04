import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController{

    @Post("/register")
    async registerUser(user: IUser): Promise<any> {

        let response: any = ''

        if(user){
            LogSuccess(`[/api/auth/register] Register user successfully ${user}`)
            await registerUser(user).then((r) => {
                response = {
                    status: 204,
                    message: `User register successfully: ${user.name}`
                }
            })
        }else {
            LogWarning('[/api/auth/register] Error to register needs User Entity')
            response = {
                status: 400,
                message: 'Please, provide a User Entity to create one'
            }
        }

        return response

    }

    @Post("/login")
    async loginUser(auth: IAuth): Promise<any> {

        let response: any = ''

        if(auth){
            LogSuccess(`[/api/auth/login] Login user successfully ${auth.email}`)
            await loginUser(auth).then((r) => {
                response = {
                    status: 204,
                    message: `User logged successfully: ${auth.email}`,
                    token: r.token
                }
            })
        }else {
            LogWarning('[/api/auth/login] Login needs Auth Entity (email && password)')
            response = {
                status: 400,
                message: 'Please, provide a email && password to login'
            }
        }

        return response

    }

    @Post('/logoute')
    async logoutUser(): Promise<any>{
        let response: any = ''
    }

}