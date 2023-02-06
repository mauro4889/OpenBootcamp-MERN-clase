import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController{

    @Post("/register")
    async registerUser(user: IUser): Promise<any> {

        let response: any = ''

        if(user){
            LogSuccess(`[/api/auth/register] Register user successfully ${user.email}`)
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Created user successfully ${user.email}`)
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

        let response: AuthResponse | ErrorResponse | undefined

        if(auth){
            LogSuccess(`[/api/auth/login] Login user successfully ${auth.email}`)
            let data = await loginUser(auth)
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        }else {
            LogWarning('[/api/auth/login] Login needs Auth Entity (email && password)')
            response = {
                error: '[AUTH ERROR]: Email & Password are needed',
                message: 'Please, provide a email && password to login'
            }
        }

        return response

    }

    @Post('/logout')
    async logoutUser(): Promise<any>{
        let response: any = ''
    }

}