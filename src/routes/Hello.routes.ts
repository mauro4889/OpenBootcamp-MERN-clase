import { HelloController } from '../controller/HelloController'
import { LogInfo } from '../utils/logger'
import express, {Request, Response} from 'express'

let helloRouter = express.Router()

helloRouter.route('/')
    .get(async (req: Request, res: Response) => {

        let name: string | any = req?.query?.name

        LogInfo(`Query Param: ${name}`)

        const controller: HelloController = new HelloController()

        const response = await controller.getMessage(name)

        return res.send(response)
    })

export default helloRouter