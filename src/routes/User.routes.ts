import { LogInfo } from '../utils/logger'
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { IUser } from '../domain/interfaces/IUser.interface'
import  bodyParser from 'body-parser'

let userRouter = express.Router()
let jsoParser = bodyParser.json() //Sirve para obtener la data mandada por el body

userRouter.route('/')
    .get(async (req: Request, res: Response) => {

        let id: string | any = req?.query?.id

        LogInfo(`Query Param: ${id}`)

        const controller: UserController = new UserController()

        const response = await controller.getUsers(id)

        return res.status(200).send(response)
    })
    .delete(async (req: Request, res: Response) => {

        let id: string | any = req?.query?.id

        LogInfo(`Query Param: ${id}`)

        const controller: UserController = new UserController()

        const response = await controller.deleteUser(id)

        return res.status(response.status).send(response)
    })
    .post(jsoParser, async (req: Request, res: Response) => {
        let data = req.body
        let name: any = req?.body?.name
        let age: any = req?.body?.age
        let email: any = req?.body?.email

        const controller: UserController = new UserController()

        let user = {
            name: name || 'default',
            email: email || 'default email',
            age: age || 18
        }

        const response: any = await controller.createUser(user)

        return res.status(201).send(response)
    })
    .put(async (req: Request, res: Response) => {

        let id: any = req.body.id
        let name: any = req?.body?.name
        let age: any = req?.body?.age
        let email: any = req?.body?.email

        const controller: UserController = new UserController()

        let user = {
            name: name || 'default',
            email: email || 'default email',
            age: age || 18
        }

        const response: any = await controller.updateUser(id, user)

        return res.status(response.status).send(response)
    })

export default userRouter