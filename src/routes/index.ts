import { LogInfo } from '../utils/logger'
import express, {Request, Response} from 'express'
import helloRouter from './Hello.routes'
import userRouter from './User.routes'
import authRouter from './Auth.routes'
let server = express()

let rootRouter = express.Router()

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api/')
    res.send('Welcome to my API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose')
})

server.use('/', rootRouter)
server.use('/hello', helloRouter)
server.use('/users', userRouter)
server.use('/auth', authRouter)

export default server