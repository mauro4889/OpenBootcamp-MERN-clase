import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import rootRouter from '../routes/index'
import helmet from 'helmet'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import mongoose from 'mongoose'

dotenv.config()

//Create Express APP
const server: Express = express()
const port: string | number = process.env.PORT || 8000

//Swagger Config and route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
)

server.use(
    '/api',
    rootRouter
)

//Static server
server.use(express.static('public'))

//Mongoose Connection
mongoose.connect('mongodb://localhost:27017/openbootcamp')

//Security Config
server.use(helmet())
server.use(cors())

//Content Type Config
server.use(express.urlencoded({extended: true, limit: '50mb'}))
server.use(express.json())
//Redirection Config
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server