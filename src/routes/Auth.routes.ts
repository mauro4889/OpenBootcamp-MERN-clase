import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '../domain/interfaces/IUser.interface'
import bcrypt from 'bcrypt'
import { IAuth } from '../domain/interfaces/IAuth.interface'


let authRouter = express.Router()

authRouter.route('/auth/register')
.post(async (req: Request, res: Response) => {

    let {name, email, password, age} = req.body

    if (password && name && email && age) {
        //Obtain the password in request and cypher
        
        let hashedPassword = bcrypt.hashSync(password, 8)

        let newUser: IUser = {
            name,
            email,
            password: hashedPassword,
            age
        }

        const controller: AuthController = new AuthController()

        const response: any = await controller.registerUser(newUser)

        return res.status(200).send(response)
    }
})

authRouter.route('/auth/login')
.post(async (req: Request, res: Response) => {

    let {email, password} = req.body

    if (password && email) {

        const controller: AuthController = new AuthController()

        let auth: IAuth = {
            email: email,
            password: password
        }

        const response: any = await controller.loginUser(auth)

        return res.status(200).send(response)
    }
})

export default authRouter